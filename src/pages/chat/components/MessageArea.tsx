import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../../../stores/chat.store';
import { useAuthStore } from '../../../stores/auth.store';
import { toast } from '../../../stores/toast.store';

function formatMessageTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateDivider(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return d.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
}

export function MessageArea() {
  const { user } = useAuthStore();
  const {
    activeThreadId,
    messages,
    messagesLoading,
    messagesHasMore,
    threads,
    fetchMessages,
    sendMessage,
  } = useChatStore();

  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLen = useRef(0);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > prevMessagesLen.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMessagesLen.current = messages.length;
  }, [messages.length]);

  // Scroll to bottom when thread changes
  useEffect(() => {
    if (activeThreadId) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }, [activeThreadId]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    if (text.length > 2000) {
      toast.warning('Message must be 2000 characters or fewer');
      return;
    }
    setSending(true);
    setInput('');
    try {
      await sendMessage(text);
    } catch {
      toast.error('Failed to send message');
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeThreadId) {
    return (
      <div className="flex-1 flex items-center justify-center text-[#888]">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-[#2a2a2e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-lg font-semibold">Select a conversation</p>
          <p className="text-sm mt-1">Choose a chat from the sidebar or start a new one</p>
        </div>
      </div>
    );
  }

  const activeThread = threads.find((t) => t.id === activeThreadId);
  const threadTitle = activeThread?.name
    ?? (activeThread?.isGroup ? 'Group Chat' : 'Direct Message');

  // Group messages by date for dividers
  let lastDateStr = '';

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Thread header */}
      <div className="px-4 sm:px-6 py-3 border-b border-[#2a2a2e] bg-[#141417]/95 backdrop-blur flex items-center gap-3">
        <div
          className={`shrink-0 h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${
            activeThread?.isGroup
              ? 'bg-[#ca8a04]/20 text-[#ca8a04]'
              : 'bg-[#2a2a2e] text-white'
          }`}
        >
          {activeThread?.isGroup ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ) : (
            threadTitle[0]?.toUpperCase() ?? '?'
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{threadTitle}</h3>
          {activeThread?.isGroup && (
            <p className="text-xs text-[#888]">
              {activeThread.participants.length} members
            </p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={containerRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-1">
        {messagesHasMore && (
          <div className="text-center mb-4">
            <button
              onClick={() => fetchMessages(activeThreadId)}
              disabled={messagesLoading}
              className="text-sm text-[#ca8a04] hover:underline disabled:opacity-50"
            >
              {messagesLoading ? 'Loading...' : 'Load older messages'}
            </button>
          </div>
        )}

        {messagesLoading && messages.length === 0 ? (
          <div className="text-center py-10 text-[#888]">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-[#888]">
            <p>No messages yet</p>
            <p className="text-sm mt-1">Send the first message!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.senderId === user?.id;
            const msgDate = formatDateDivider(msg.createdAt);
            let showDivider = false;
            if (msgDate !== lastDateStr) {
              showDivider = true;
              lastDateStr = msgDate;
            }

            return (
              <div key={msg.id}>
                {showDivider && (
                  <div className="flex items-center gap-3 my-4">
                    <div className="flex-1 h-px bg-[#2a2a2e]" />
                    <span className="text-[10px] text-[#666] font-medium">{msgDate}</span>
                    <div className="flex-1 h-px bg-[#2a2a2e]" />
                  </div>
                )}
                <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-1`}>
                  <div
                    className={`max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-2 ${
                      isOwn
                        ? 'bg-[#ca8a04] text-[#0d0d0f] rounded-br-md'
                        : 'bg-[#1e1e22] text-white rounded-bl-md'
                    }`}
                  >
                    {!isOwn && activeThread?.isGroup && msg.sender && (
                      <p className="text-[10px] font-semibold text-[#ca8a04] mb-0.5">
                        {msg.sender.fullName}
                      </p>
                    )}
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                    <p
                      className={`text-[10px] mt-1 text-right ${
                        isOwn ? 'text-[#0d0d0f]/60' : 'text-[#666]'
                      }`}
                    >
                      {formatMessageTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 sm:px-6 py-3 border-t border-[#2a2a2e] bg-[#141417]">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 resize-none rounded-xl bg-[#1a1a1d] border border-[#2a2a2e] px-4 py-2.5 text-sm text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent max-h-32"
            style={{ minHeight: '42px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 128) + 'px';
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="shrink-0 h-[42px] w-[42px] rounded-xl bg-[#ca8a04] text-[#0d0d0f] flex items-center justify-center hover:bg-[#d4940a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-[10px] text-[#666] mt-1">
          {input.length}/2000 · Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
