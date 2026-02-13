import { useEffect, useState, useMemo } from 'react';
import { usersService } from '../../../services/users.service';
import { useAuthStore } from '../../../stores/auth.store';
type MinimalUser = {
  id: string;
  fullName: string;
  role: string;
};

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDirect: (userId: string) => void;
  onCreateGroup: (userIds: string[], name: string) => void;
}

export function NewChatModal({
  isOpen,
  onClose,
  onCreateDirect,
  onCreateGroup,
}: NewChatModalProps) {
  const { user: currentUser } = useAuthStore();
  const [mode, setMode] = useState<'direct' | 'group'>('direct');
  const [users, setUsers] = useState<MinimalUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<MinimalUser[]>([]);
  const [groupName, setGroupName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    usersService
      .getMinimal()
      .then((res) => setUsers(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isOpen]);

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setMode('direct');
      setSearchTerm('');
      setSelectedUsers([]);
      setGroupName('');
    }
  }, [isOpen]);

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => u.id !== currentUser?.id)
      .filter((u) => {
        if (!searchTerm.trim()) return true;
        const q = searchTerm.toLowerCase();
        return (
          u.fullName.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q)
        );
      });
  }, [users, searchTerm, currentUser?.id]);

  const toggleUser = (u: MinimalUser) => {
    setSelectedUsers((prev) =>
      prev.find((s) => s.id === u.id)
        ? prev.filter((s) => s.id !== u.id)
        : [...prev, u],
    );
  };

  const isSelected = (id: string) => selectedUsers.some((u) => u.id === id);

  const handleCreate = async () => {
    if (creating) return;
    setCreating(true);
    try {
      if (mode === 'group') {
        onCreateGroup(
          selectedUsers.map((u) => u.id),
          groupName.trim(),
        );
      }
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#141417] border border-[#2a2a2e] rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2a2a2e]">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">New Chat</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-[#888] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mode toggle */}
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => { setMode('direct'); setSelectedUsers([]); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mode === 'direct'
                  ? 'bg-[#ca8a04] text-[#0d0d0f]'
                  : 'bg-[#1a1a1d] text-[#888] hover:text-white'
              }`}
            >
              Direct Message
            </button>
            <button
              onClick={() => { setMode('group'); setSelectedUsers([]); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mode === 'group'
                  ? 'bg-[#ca8a04] text-[#0d0d0f]'
                  : 'bg-[#1a1a1d] text-[#888] hover:text-white'
              }`}
            >
              Group Chat
            </button>
          </div>

          {/* Group name input */}
          {mode === 'group' && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Group name (optional)"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              />
            </div>
          )}

          {/* Selected users chips */}
          {mode === 'group' && selectedUsers.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {selectedUsers.map((u) => (
                <span
                  key={u.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ca8a04]/20 text-[#ca8a04] text-xs font-medium"
                >
                  {u.fullName}
                  <button
                    onClick={() => toggleUser(u)}
                    className="hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
            />
          </div>
        </div>

        {/* Users list */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-10 text-[#888]">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-10 text-[#888]">No users found</div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => {
                    if (mode === 'direct') {
                      onCreateDirect(u.id);
                    } else {
                      toggleUser(u);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-colors group ${
                    isSelected(u.id)
                      ? 'bg-[#ca8a04]/10 border-[#ca8a04]'
                      : 'bg-[#1a1a1d] border-[#2a2a2e] hover:border-[#ca8a04] hover:bg-[#1a1a1d]/80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {mode === 'group' && (
                        <div
                          className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected(u.id)
                              ? 'bg-[#ca8a04] border-[#ca8a04]'
                              : 'border-[#2a2a2e]'
                          }`}
                        >
                          {isSelected(u.id) && (
                            <svg className="w-3 h-3 text-[#0d0d0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white group-hover:text-[#ca8a04] transition-colors truncate">
                            {u.fullName}
                          </span>
                          <span
                            className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[#2a2a2e] text-[#888]"
                          >
                            User
                          </span>
                        </div>
                                <div className="mt-0.5 text-sm text-[#888] truncate">{u.role}</div>
                      </div>
                    </div>
                    <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-[#ca8a04]/20 text-[#ca8a04] shrink-0">
                      {u.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2a2a2e] bg-[#1a1a1d]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#888]">
              {mode === 'direct'
                ? 'Click a user to start a direct message'
                : `${selectedUsers.length} user${selectedUsers.length === 1 ? '' : 's'} selected`}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
              >
                Cancel
              </button>
              {mode === 'group' && (
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={selectedUsers.length < 2 || creating}
                  className="px-4 py-2 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold hover:bg-[#d4940a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  {creating ? 'Creating...' : 'Create Group'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
