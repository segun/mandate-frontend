import { useState, useCallback, useEffect } from 'react';
import { useChatStore } from '../../stores/chat.store';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from '../../stores/toast.store';
import { ThreadList } from './components/ThreadList';
import { MessageArea } from './components/MessageArea';
import { NewChatModal } from './components/NewChatModal';

export function ChatPage() {
  const [showNewChat, setShowNewChat] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { createThread, setActiveThread, activeThreadId, connectSocket, disconnectSocket, setCurrentUserId } = useChatStore();
  const { user, accessToken } = useAuthStore();

  useEffect(() => {
    setCurrentUserId(user?.id ?? null);
  }, [user?.id, setCurrentUserId]);

  useEffect(() => {
    if (accessToken) {
      connectSocket(accessToken, user?.id);
    }
    return () => {
      disconnectSocket();
    };
  }, [accessToken, user?.id, connectSocket, disconnectSocket]);

  const handleCreateDirect = useCallback(
    async (userId: string) => {
      try {
        const thread = await createThread([userId]);
        setActiveThread(thread.id, user?.id);
        setShowNewChat(false);
        setShowSidebar(false);
      } catch {
        toast.error('Failed to create chat');
      }
    },
    [createThread, setActiveThread, user],
  );

  const handleCreateGroup = useCallback(
    async (userIds: string[], name: string) => {
      try {
        const thread = await createThread(userIds, name || undefined);
        setActiveThread(thread.id, user?.id);
        setShowNewChat(false);
        setShowSidebar(false);
      } catch {
        toast.error('Failed to create group chat');
      }
    },
    [createThread, setActiveThread, user],
  );

  return (
    <div className="flex h-[calc(100vh-7rem)] rounded-2xl border border-[#2a2a2e] overflow-hidden bg-[#0d0d0f]">
      {/* Sidebar – thread list */}
      <div
        className={`${
          showSidebar ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-80 lg:w-96 border-r border-[#2a2a2e] bg-[#141417] shrink-0`}
      >
        <ThreadList onNewChat={() => setShowNewChat(true)} />
      </div>

      {/* Main – message area */}
      <div
        className={`${
          !showSidebar || !activeThreadId ? '' : 'hidden'
        } md:flex flex-1 flex-col min-w-0`}
      >
        {/* Mobile back button */}
        {activeThreadId && (
          <button
            onClick={() => { setShowSidebar(true); setActiveThread(null); }}
            className="md:hidden flex items-center gap-1 px-4 py-2 text-sm text-[#ca8a04] border-b border-[#2a2a2e]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to chats
          </button>
        )}
        <MessageArea />
      </div>

      {/* New chat modal */}
      <NewChatModal
        isOpen={showNewChat}
        onClose={() => setShowNewChat(false)}
        onCreateDirect={handleCreateDirect}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
}
