import { api } from '../lib/api';

// ── Types ──────────────────────────────────────────────────────

export interface ChatParticipant {
  userId: string;
  joinedAt?: string;
}

export interface ChatMessageSender {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface ChatMessage {
  id: string;
  tenantId: string;
  threadId: string;
  senderId: string;
  content: string;
  createdAt: string;
  sender?: ChatMessageSender;
}

export interface ChatThread {
  id: string;
  tenantId: string;
  createdById: string;
  isGroup: boolean;
  name: string | null;
  lastMessageId: string | null;
  lastMessageAt: string | null;
  createdAt: string;
  updatedAt: string;
  participants: ChatParticipant[];
  lastMessage?: {
    id: string;
    senderId: string;
    content: string;
    createdAt: string;
  } | null;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: PaginatedMeta;
}

// ── Service ────────────────────────────────────────────────────

export const chatService = {
  /** Create a new chat thread (direct or group) */
  async createThread(data: {
    participantIds: string[];
    name?: string;
    tenantId?: string;
  }): Promise<ChatThread> {
    const response = await api.post('/chats', data);
    return response.data.data;
  },

  /** List chat threads for current user */
  async listThreads(
    page = 1,
    limit = 20,
    tenantId?: string,
  ): Promise<PaginatedResponse<ChatThread>> {
    const response = await api.get('/chats', {
      params: { page, limit, ...(tenantId ? { tenantId } : {}) },
    });
    return response.data;
  },

  /** Get messages for a chat thread */
  async getMessages(
    threadId: string,
    page = 1,
    limit = 50,
    tenantId?: string,
  ): Promise<PaginatedResponse<ChatMessage>> {
    const response = await api.get(`/chats/${threadId}/messages`, {
      params: { page, limit, ...(tenantId ? { tenantId } : {}) },
    });
    return response.data;
  },

  /** Send a message to a chat thread */
  async sendMessage(
    threadId: string,
    content: string,
    tenantId?: string,
  ): Promise<ChatMessage> {
    const response = await api.post(`/chats/${threadId}/messages`, {
      content,
      ...(tenantId ? { tenantId } : {}),
    });
    return response.data.data;
  },
};
