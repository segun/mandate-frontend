import type { User } from '../services/users.service';

interface UserSelectionModalProps {
  isOpen: boolean;
  title: string;
  users: User[];
  searchTerm: string;
  minSearchChars?: number;
  loading?: boolean;
  error?: string;
  onSearchChange: (value: string) => void;
  onSelect: (user: User) => void;
  onCancel: () => void;
}

export function UserSelectionModal({
  isOpen,
  title,
  users,
  searchTerm,
  minSearchChars = 3,
  loading = false,
  error,
  onSearchChange,
  onSelect,
  onCancel,
}: UserSelectionModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      {/* Modal */}
      <div className="relative bg-[#141417] border border-[#2a2a2e] rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2a2a2e]">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button
              type="button"
              onClick={onCancel}
              className="text-[#888] hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Search Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type to search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
            />
            <p className="mt-2 text-xs text-[#888]">
              {searchTerm.trim().length < minSearchChars
                ? `Search starts after ${minSearchChars} characters. Showing all users.`
                : 'Searching users...'}
            </p>
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-10 text-[#888]">Loading users...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-400">{error}</div>
          ) : users.length === 0 ? (
            <div className="text-center py-10 text-[#888]">
              {searchTerm.trim().length >= minSearchChars
                ? 'No users found for that search'
                : 'No users available'}
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => onSelect(user)}
                  className="w-full text-left p-4 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] hover:border-[#ca8a04] hover:bg-[#1a1a1d]/80 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white group-hover:text-[#ca8a04] transition-colors">
                          {user.fullName}
                        </span>
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                          user.isActive 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-[#2a2a2e] text-[#888]'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-[#888] truncate">{user.email}</div>
                      {user.phone && (
                        <div className="mt-0.5 text-sm text-[#888]">{user.phone}</div>
                      )}
                    </div>
                    <div className="shrink-0">
                      <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-lg bg-[#ca8a04]/20 text-[#ca8a04]">
                        {user.role}
                      </span>
                    </div>
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
              {users.length} user{users.length === 1 ? '' : 's'}
            </span>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
