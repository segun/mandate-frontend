import { useEffect, useMemo, useState } from 'react';
import { useChatStore } from '../../../stores/chat.store';
import { useAuthStore } from '../../../stores/auth.store';
import { usersService } from '../../../services/users.service';
import type { ChatThread } from '../../../services/chat.service';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import { toast } from '../../../stores/toast.store';

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
  const [userMap, setUserMap] = useState<Map<string, string>>(new Map());
  const [deleteTarget, setDeleteTarget] = useState<ChatThread | null>(null);
  const {
    threads,
    threadsLoading,
    threadsError,
    threadsHasMore,
    activeThreadId,
    setActiveThread,
    fetchThreads,
    deleteThread,
    unreadThreadIds,
  } = useChatStore();

  useEffect(() => {
    fetchThreads(true).catch(() => {});
  }, [fetchThreads]);

  useEffect(() => {
    let isMounted = true;
    usersService
      .getMinimal()
      .then((users) => {
        if (!isMounted) return;
        const map = new Map<string, string>();
        users.forEach((u) => map.set(u.id, u.fullName));
        setUserMap(map);
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const displayNameForThread = useMemo(() => {
    return (thread: ChatThread) => threadDisplayName(thread, user?.id, userMap);
  }, [user?.id, userMap]);

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
              const isUnread = unreadThreadIds.has(thread.id);
              const displayName = displayNameForThread(thread);
              return (
                <div
                  key={thread.id}
                  className={`w-full text-left px-4 py-3 border-b border-[#2a2a2e]/50 transition-colors ${
                    isActive
                      ? 'bg-[#ca8a04]/10 border-l-2 border-l-[#ca8a04]'
                      : isUnread
                        ? 'bg-[#1a1a1e]/60'
                        : 'hover:bg-[#1a1a1e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => setActiveThread(thread.id, user?.id)}
                      className="flex items-center gap-2 min-w-0 flex-1 text-left"
                    >
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
                        <p className={`text-sm font-semibold truncate ${isUnread ? 'text-white' : 'text-white'}`}>
                          {displayName}
                        </p>
                        {thread.lastMessage && (
                          <p className={`text-xs truncate mt-0.5 ${isUnread ? 'text-[#c4c4c4]' : 'text-[#888]'}`}>
                            {thread.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </button>
                    <div className="flex items-start gap-2">
                      {isUnread && (
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#ca8a04]" />
                      )}
                      {thread.lastMessageAt && (
                        <span className="text-[10px] text-[#666] shrink-0 mt-0.5">
                          {formatTime(thread.lastMessageAt)}
                        </span>
                      )}
                      <button
                        onClick={() => setDeleteTarget(thread)}
                        className="shrink-0 p-1 rounded-md text-[#888] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete chat"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {thread.isGroup && (
                    <span className="inline-block mt-1 text-[10px] text-[#666]">
                      {thread.participants.length} members
                    </span>
                  )}
                </div>
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

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete chat"
        message={
          <span>
            Are you sure you want to delete this chat? This will remove it from your list.
          </span>
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          try {
            await deleteThread(deleteTarget.id);
            toast.success('Chat deleted');
          } catch {
            toast.error('Failed to delete chat');
          } finally {
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
