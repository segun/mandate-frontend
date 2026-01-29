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
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Users</h1>
          <p className="text-sm text-slate-600">Search and manage users</p>
        </div>
        <Link
          to="/users/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
        >
          + Add User
        </Link>
      </div>

      {!loading && error && users.length === 0 && (
        <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">{error}</div>
      )}

      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <form onSubmit={handleSearch} className="border-b border-slate-100 bg-slate-50/60 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">🔍</div>
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-blue-800 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => { setSearch(''); setPage(1); }}
                className="px-3 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading...</div>
        ) : users.length === 0 ? (
          <div className="p-10 text-center text-slate-500">No users found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Assignment</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-primary">{user.fullName}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{user.phone || '-'}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{user.role.replace(/_/g, ' ')}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{getUserAssignedLocation(user)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${user.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/users/${user.id}`} className="text-secondary hover:underline text-sm font-semibold">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {users.map((user) => (
                <div key={user.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-primary">{user.fullName}</h3>
                    <Link to={`/users/${user.id}`} className="text-secondary text-sm font-semibold">
                      View →
                    </Link>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{user.email}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-600">
                      {user.role.replace(/_/g, ' ')}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${user.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {!loading && users.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
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
