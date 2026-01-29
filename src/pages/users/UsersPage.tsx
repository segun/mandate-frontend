import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { User, PaginatedResponse } from '../../services/users.service';
import { usersService, getUserAssignedLocation } from '../../services/users.service';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let response: PaginatedResponse<User>;
      if (search) {
        response = await usersService.search(search, page);
      } else {
        response = await usersService.getAll(page);
      }
      setUsers(response.data);
      setTotalPages(response.meta?.totalPages || 1);
      setError('');
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Users</h1>
          <p className="text-sm text-[#888]">Search and manage users</p>
        </div>
        <Link
          to="/users/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ca8a04] text-[#0d0d0f] font-semibold rounded-lg shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
        >
          + Add User
        </Link>
      </div>

      {!loading && error && users.length === 0 && (
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">{error}</div>
      )}

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <form onSubmit={handleSearch} className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-[#ca8a04]/10 text-[#ca8a04]">🔍</div>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent placeholder:text-[#666]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => { setSearch(''); setPage(1); }}
                className="px-3 py-2.5 rounded-lg border border-[#ca8a04] bg-transparent text-[#ca8a04] font-semibold hover:bg-[#ca8a04]/10 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        {loading ? (
          <div className="p-10 text-center text-[#888]">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No users found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Assignment</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-[#1a1a1d]/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-white">{user.fullName}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{user.phone || '-'}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{user.role.replace(/_/g, ' ')}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{getUserAssignedLocation(user)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${user.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/users/${user.id}`} className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#2a2a2e]">
              {users.map((user) => (
                <div key={user.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{user.fullName}</h3>
                    <Link to={`/users/${user.id}`} className="text-[#ca8a04] text-sm font-semibold">
                      View →
                    </Link>
                  </div>
                  <p className="text-sm text-[#888] mb-2">{user.email}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[#2a2a2e] text-[#888]">
                      {user.role.replace(/_/g, ' ')}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${user.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {!loading && users.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#2a2a2e] bg-[#1a1a1d]">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-[#888]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
