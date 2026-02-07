import { useEffect, useMemo } from 'react';
import { useChatStore } from '../../../stores/chat.store';
import { useAuthStore } from '../../../stores/auth.store';
import type { ChatThread } from '../../../services/chat.service';

interface ThreadListProps {
  onNewChat: () => void;
}

function threadDisplayName(
  thread: ChatThread,
  currentUserId: string | undefined,
  userMap: Map<string, string>,
): string {
  if (thread.name) return thread.name;
  if (!thread.isGroup) {
    const other = thread.participants.find((p) => p.userId !== currentUserId);
    if (other) return userMap.get(other.userId) ?? 'Direct Message';
    return 'Direct Message';
  }
  return 'Group Chat';
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) {
    return d.toLocaleDateString([], { weekday: 'short' });
  }
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function ThreadList({ onNewChat }: ThreadListProps) {
  const { user } = useAuthStore();
  const {
    threads,
    threadsLoading,
    threadsError,
    threadsHasMore,
    activeThreadId,
    setActiveThread,
    fetchThreads,
  } = useChatStore();

  useEffect(() => {
    fetchThreads(true).catch(() => {});
  }, [fetchThreads]);

  // Build a userId → name map from thread participants (we only have IDs, names come from messages)
  const userMap = useMemo(() => {
    const map = new Map<string, string>();
    threads.forEach((t) => {
      if (t.lastMessage?.senderId) {
        // we don't have names in list, but we can use thread name fallback
      }
    });
    return map;
  }, [threads]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2a2a2e] flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Chats</h2>
        <button
          onClick={onNewChat}
          className="p-2 rounded-lg text-[#ca8a04] hover:bg-[#ca8a04]/10 transition-colors"
          title="New chat"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Thread list */}
      <div className="flex-1 overflow-y-auto">
        {threadsLoading && threads.length === 0 ? (
          <div className="text-center py-10 text-[#888]">Loading chats...</div>
        ) : threadsError ? (
          <div className="text-center py-10 px-4">
            <p className="text-red-400 mb-3">{threadsError}</p>
            <button
              onClick={() => fetchThreads(true)}
              className="text-sm text-[#ca8a04] hover:underline"
            >
              Retry
            </button>
          </div>
        ) : threads.length === 0 ? (
          <div className="text-center py-10 px-4">
            <p className="text-[#888] mb-3">No conversations yet</p>
            <button
              onClick={onNewChat}
              className="text-sm text-[#ca8a04] hover:underline"
            >
              Start a new chat
            </button>
          </div>
        ) : (
          <>
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const displayName = threadDisplayName(thread, user?.id, userMap);
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThread(thread.id)}
                  className={`w-full text-left px-4 py-3 border-b border-[#2a2a2e]/50 transition-colors ${
                    isActive
                      ? 'bg-[#ca8a04]/10 border-l-2 border-l-[#ca8a04]'
                      : 'hover:bg-[#1a1a1e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {/* Avatar */}
                      <div
                        className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                          thread.isGroup
                            ? 'bg-[#ca8a04]/20 text-[#ca8a04]'
                            : 'bg-[#2a2a2e] text-white'
                        }`}
                      >
                        {thread.isGroup ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        ) : (
                          displayName[0]?.toUpperCase() ?? '?'
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">
                          {displayName}
                        </p>
                        {thread.lastMessage && (
                          <p className="text-xs text-[#888] truncate mt-0.5">
                            {thread.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                    {thread.lastMessageAt && (
                      <span className="text-[10px] text-[#666] shrink-0 mt-0.5">
                        {formatTime(thread.lastMessageAt)}
                      </span>
                    )}
                  </div>
                  {thread.isGroup && (
                    <span className="inline-block mt-1 text-[10px] text-[#666]">
                      {thread.participants.length} members
                    </span>
                  )}
                </button>
              );
            })}
            {threadsHasMore && (
              <button
                onClick={() => fetchThreads()}
                disabled={threadsLoading}
                className="w-full py-3 text-sm text-[#ca8a04] hover:bg-[#1a1a1e] transition-colors disabled:opacity-50"
              >
                {threadsLoading ? 'Loading...' : 'Load more'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
