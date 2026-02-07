import { create } from 'zustand';
import { chatService } from '../services/chat.service';
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

  // Actions
  fetchThreads: (reset?: boolean) => Promise<void>;
  fetchMessages: (threadId: string, reset?: boolean) => Promise<void>;
  setActiveThread: (threadId: string | null) => void;
  sendMessage: (content: string) => Promise<void>;
  createThread: (participantIds: string[], name?: string) => Promise<ChatThread>;
  prependMessage: (message: ChatMessage) => void;
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

  fetchMessages: async (threadId: string, reset = false) => {
    const page = reset ? 1 : get().messagesPage;
    set({ messagesLoading: true, messagesError: null });
    try {
      const res = await chatService.getMessages(threadId, page, 50);
      set((s) => ({
        messages: reset ? res.data : [...s.messages, ...res.data],
        messagesPage: page + 1,
        messagesHasMore: res.meta.hasNext,
        messagesLoading: false,
      }));
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

  setActiveThread: (threadId) => {
    set({ activeThreadId: threadId, messages: [], messagesPage: 1, messagesHasMore: true });
    if (threadId) {
      get().fetchMessages(threadId, true);
    }
  },

  sendMessage: async (content: string) => {
    const threadId = get().activeThreadId;
    if (!threadId) return;
    const msg = await chatService.sendMessage(threadId, content);
    // Append new message to the end
    set((s) => ({ messages: [...s.messages, msg] }));
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
}));
