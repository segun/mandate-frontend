import { create } from 'zustand';
import { chatService } from '../services/chat.service';
import { getChatSocket, disconnectChatSocket } from '../lib/chatSocket';
import type { ChatSocket } from '../lib/chatSocket';
import { toast } from './toast.store';
import type { ChatThread, ChatMessage } from '../services/chat.service';

interface ChatState {
  // Thread list
  threads: ChatThread[];
  threadsLoading: boolean;
  threadsError: string | null;
  threadsPage: number;
  threadsHasMore: boolean;

  // Active thread
  activeThreadId: string | null;
  messages: ChatMessage[];
  messagesLoading: boolean;
  messagesError: string | null;
  messagesPage: number;
  messagesHasMore: boolean;

  // Receipt tracking
  _markedMessageIds: Set<string>;

  // Socket
  _socket: ChatSocket | null;
  _joinedThreadId: string | null;
  _currentUserId: string | null;

  // Actions
  fetchThreads: (reset?: boolean) => Promise<void>;
  fetchMessages: (threadId: string, reset?: boolean, currentUserId?: string) => Promise<void>;
  setActiveThread: (threadId: string | null, currentUserId?: string) => void;
  sendMessage: (content: string) => Promise<void>;
  createThread: (participantIds: string[], name?: string) => Promise<ChatThread>;
  prependMessage: (message: ChatMessage) => void;
  connectSocket: (accessToken: string, currentUserId?: string) => void;
  disconnectSocket: () => void;
  setCurrentUserId: (userId: string | null) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  threads: [],
  threadsLoading: false,
  threadsError: null,
  threadsPage: 1,
  threadsHasMore: true,

  activeThreadId: null,
  messages: [],
  messagesLoading: false,
  messagesError: null,
  messagesPage: 1,
  messagesHasMore: true,
  _markedMessageIds: new Set(),
  _socket: null,
  _joinedThreadId: null,
  _currentUserId: null,

  fetchThreads: async (reset = false) => {
    const page = reset ? 1 : get().threadsPage;
    set({ threadsLoading: true, threadsError: null });
    try {
      const res = await chatService.listThreads(page, 20);
      set((s) => ({
        threads: reset ? res.data : [...s.threads, ...res.data],
        threadsPage: page + 1,
        threadsHasMore: res.meta.hasNext,
        threadsLoading: false,
      }));
    } catch (err: unknown) {
      // Don't let 401 interceptor redirect — swallow and show error in-page
      const status = (err as { response?: { status?: number } })?.response?.status;
      set({
        threadsLoading: false,
        threadsError: status === 401
          ? 'Session expired. Please log in again.'
          : 'Failed to load chats. Please try again.',
      });
    }
  },

  fetchMessages: async (threadId: string, reset = false, currentUserId?: string) => {
    const page = reset ? 1 : get().messagesPage;
    set({ messagesLoading: true, messagesError: null });
    try {
      const res = await chatService.getMessages(threadId, page, 50);
      const older = [...res.data].reverse(); // API returns newest-first; display oldest-on-top
      if (reset) {
        set({ _markedMessageIds: new Set() });
      }
      set((s) => ({
        messages: reset ? older : [...older, ...s.messages],
        messagesPage: page + 1,
        messagesHasMore: res.meta.hasNext,
        messagesLoading: false,
      }));
      // Mark received messages as read (fire-and-forget)
      if (currentUserId) {
        const marked = get()._markedMessageIds;
        const toMark = older.filter(
          (m) => m.senderId !== currentUserId && !marked.has(m.id),
        );
        if (toMark.length > 0) {
          const newMarked = new Set(marked);
          for (const msg of toMark) {
            newMarked.add(msg.id);
            chatService.markRead(threadId, msg.id).catch(() => {});
          }
          set({ _markedMessageIds: newMarked });
        }
      }
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      set({
        messagesLoading: false,
        messagesError: status === 401
          ? 'Session expired. Please log in again.'
          : 'Failed to load messages.',
      });
    }
  },

  setActiveThread: (threadId, currentUserId) => {
    set({ activeThreadId: threadId, messages: [], messagesPage: 1, messagesHasMore: true, _markedMessageIds: new Set() });
    if (threadId) {
      get().fetchMessages(threadId, true, currentUserId);
    }
    const socket = get()._socket;
    if (socket && threadId) {
      if (socket.connected) {
        socket.emit('thread:join', { threadId });
      }
      set({ _joinedThreadId: threadId });
    }
  },

  sendMessage: async (content: string) => {
    const threadId = get().activeThreadId;
    if (!threadId) return;
    const msg = await chatService.sendMessage(threadId, content);
    // Append new message to the end
    set((s) => {
      if (s.messages.some((m) => m.id === msg.id)) return s;
      return { messages: [...s.messages, msg] };
    });
    // Update thread's lastMessage in list
    set((s) => ({
      threads: s.threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              lastMessage: {
                id: msg.id,
                senderId: msg.senderId,
                content: msg.content,
                createdAt: msg.createdAt,
              },
              lastMessageAt: msg.createdAt,
              lastMessageId: msg.id,
            }
          : t,
      ),
    }));
  },

  createThread: async (participantIds, name) => {
    const thread = await chatService.createThread({ participantIds, name });
    set((s) => ({ threads: [thread, ...s.threads] }));
    return thread;
  },

  prependMessage: (message) => {
    set((s) => ({ messages: [...s.messages, message] }));
  },

  connectSocket: (accessToken: string, currentUserId?: string) => {
    const socket = getChatSocket(accessToken);
    set({ _socket: socket, _currentUserId: currentUserId ?? null });

    const activeThreadId = get().activeThreadId;
    if (activeThreadId) {
      set({ _joinedThreadId: activeThreadId });
    }

    if(!socket) {return}

    socket.off('connect');
    socket.off('message:new');
    socket.off('message:read');
    socket.off('thread:joined');
    socket.off('thread:error');

    socket.on('connect', () => {
      const threadId = get()._joinedThreadId;
      if (threadId) {
        socket.emit('thread:join', { threadId });
      }
    });

    socket.on('message:new', (message: ChatMessage) => {
      const activeThreadId = get().activeThreadId;
      const currentUserId = get()._currentUserId;
      if (message.threadId === activeThreadId) {
        set((s) => {
          if (s.messages.some((m) => m.id === message.id)) return s;
          return { messages: [...s.messages, message] };
        });
        // If I'm viewing the thread and the message is from someone else, mark as read
        if (currentUserId && message.senderId !== currentUserId) {
          chatService.markRead(activeThreadId, message.id).catch(() => {});
        }
      }
      // Update thread list lastMessage
      set((s) => ({
        threads: s.threads.map((t) =>
          t.id === message.threadId
            ? {
                ...t,
                lastMessage: {
                  id: message.id,
                  senderId: message.senderId,
                  content: message.content,
                  createdAt: message.createdAt,
                },
                lastMessageAt: message.createdAt,
                lastMessageId: message.id,
              }
            : t,
        ),
      }));
    });

    socket.on('message:read', (payload: { threadId: string; messageId: string; read: boolean; readAt: string | null }) => {
      set((s) => ({
        messages: s.messages.map((m) =>
          m.id === payload.messageId
            ? { ...m, read: payload.read, readAt: payload.readAt }
            : m,
        ),
      }));
    });

    socket.on('thread:joined', (payload: { threadId: string }) => {
      set({ _joinedThreadId: payload.threadId });
      toast.info('Joined chat');
    });

    socket.on('thread:error', (payload: { message?: string }) => {
      const message = payload?.message || 'Failed to join chat';
      if (message.toLowerCase().includes('unauthorized')) return;
      toast.error(message);
    });
  },

  disconnectSocket: () => {
    disconnectChatSocket();
    set({ _socket: null, _joinedThreadId: null });
  },

  setCurrentUserId: (userId) => {
    const prev = get()._currentUserId;
    if (prev === userId) return;
    set({
      _currentUserId: userId,
      threads: [],
      threadsLoading: false,
      threadsError: null,
      threadsPage: 1,
      threadsHasMore: true,
      activeThreadId: null,
      messages: [],
      messagesLoading: false,
      messagesError: null,
      messagesPage: 1,
      messagesHasMore: true,
      _markedMessageIds: new Set(),
      _joinedThreadId: null,
    });
  },
}));
