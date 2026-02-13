import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Ward, PaginatedResponse } from '../../services/wards.service';
import { wardsService, getWardName, getWardLgaName } from '../../services/wards.service';
import { useAuthStore } from '../../stores/auth.store';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export function WardsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; ward: Ward | null }>({ isOpen: false, ward: null });

  const fetchWards = async () => {
    setLoading(true);
    try {
      // Use name filter for search - only search if 3+ characters
      const searchTerm = search.length >= 3 ? search : undefined;
      const response: PaginatedResponse<Ward> = await wardsService.getAll(page, 20, undefined, searchTerm);
      setWards(response.data);
      setTotalPages(response.meta?.totalPages || 1);
      setError('');
    } catch {
      setError('Failed to fetch wards');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchWards();
  };

  const openDeleteModal = (ward: Ward) => {
    setDeleteModal({ isOpen: true, ward });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, ward: null });
  };

  const handleDelete = async () => {
    const ward = deleteModal.ward;
    if (!ward) return;

    setDeleting(ward.id);
    closeDeleteModal();
    try {
      await wardsService.delete(ward.id);
      setWards((prev) => prev.filter((item) => item.id !== ward.id));
    } catch {
      const name = getWardName(ward) || 'Ward';
      setError(`Failed to delete ${name}`);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete Ward"
        message={
          <>
            Are you sure you want to delete <span className="text-[#ca8a04] font-medium">"{deleteModal.ward ? getWardName(deleteModal.ward) : ''}"</span>?
            This action cannot be undone.
          </>
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={closeDeleteModal}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Wards</h1>
          <p className="text-sm text-[#888]">Browse, search, and manage wards</p>
        </div>
        <Link
          to="/wards/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ca8a04] text-[#0d0d0f] font-semibold rounded-lg shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
        >
          + Add Ward
        </Link>
      </div>

      {!loading && error && wards.length === 0 && (
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">{error}</div>
      )}

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <form onSubmit={handleSearch} className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-[#ca8a04]/10 text-[#ca8a04]">🔍</div>
              <input
                type="text"
                placeholder="Search by ward name or code"
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
        ) : wards.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No wards found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">LGA</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Coordinator</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {wards.map((ward) => (
                    <tr
                      key={ward.id}
                      onClick={() => navigate(`/wards/${ward.id}`)}
                      className="hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">{getWardName(ward)}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{getWardLgaName(ward)}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{ward.coordinator?.fullName || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          ward.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'
                        }`}>
                          {ward.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                          <Link to={`/wards/${ward.id}`} className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold">
                            View
                          </Link>
                          {isSuperAdmin && (
                            <button
                              onClick={() => openDeleteModal(ward)}
                              disabled={deleting === ward.id}
                              className="text-red-400 hover:text-red-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deleting === ward.id ? 'Deleting...' : 'Delete'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#2a2a2e]">
              {wards.map((ward) => (
                <div
                  key={ward.id}
                  onClick={() => navigate(`/wards/${ward.id}`)}
                  className="p-4 cursor-pointer hover:bg-[#1a1a1d]/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-white">{getWardName(ward)}</h3>
                      <p className="text-sm text-[#888]">{getWardLgaName(ward)}</p>
                    </div>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <Link to={`/wards/${ward.id}`} className="text-[#ca8a04] text-sm font-semibold">
                        View →
                      </Link>
                      {isSuperAdmin && (
                        <button
                          onClick={() => openDeleteModal(ward)}
                          disabled={deleting === ward.id}
                          className="text-red-400 text-sm font-semibold disabled:opacity-50"
                        >
                          {deleting === ward.id ? '...' : 'Delete'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      ward.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'
                    }`}>
                      {ward.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[#2a2a2e] text-[#888]">
                      {ward.coordinator?.fullName || 'No coordinator'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {!loading && wards.length > 0 && (
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
