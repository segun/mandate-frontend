
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { LGA, PaginatedResponse } from '../../services/lgas.service';
import { lgasService, getLgaName, getLgaStateName } from '../../services/lgas.service';
import { useAuthStore } from '../../stores/auth.store';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';
import { UserRole } from '../../lib/permissions';

export function LGAsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isPlatformOwner = user?.role === UserRole.PLATFORM_OWNER;
  const [lgas, setLGAs] = useState<LGA[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; lga: LGA | null }>({ isOpen: false, lga: null });

  const fetchLGAs = async () => {
    setLoading(true);
    try {
      // Use name filter for search - only search if 3+ characters
      const searchTerm = search.length >= 3 ? search : undefined;
      const response: PaginatedResponse<LGA> = await lgasService.getAll(
        undefined,
        page,
        DEFAULT_PAGE_LIMIT,
        searchTerm
      );
      setLGAs(response.data.data);
      setTotalPages(response.meta?.totalPages || 1);
      setError('');
    } catch (err) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { status?: number } }).response?.status === 'number' &&
        (err as { response: { status: number } }).response.status === 404
      ) {
        setError('LGAs endpoint not found on the server (404). Check backend routes.');
      } else {
        setError('Failed to fetch LGAs');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLGAs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLGAs();
  };

  const openDeleteModal = (lga: LGA) => {
    setDeleteModal({ isOpen: true, lga });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, lga: null });
  };

  const handleDelete = async () => {
    const lga = deleteModal.lga;
    if (!lga) return;

    setDeleting(lga.id);
    closeDeleteModal();
    try {
      await lgasService.delete(lga.id);
      setLGAs((prev) => prev.filter((item) => item.id !== lga.id));
    } catch {
      const name = getLgaName(lga) || 'LGA';
      setError(`Failed to delete ${name}`);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete LGA"
        message={
          <>
            Are you sure you want to delete <span className="text-[#ca8a04] font-medium">"{deleteModal.lga ? getLgaName(deleteModal.lga) : ''}"</span>?
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Local Government Areas</h1>
          <p className="text-sm text-[#888]">Browse, search, and manage LGAs</p>
        </div>
        {!isPlatformOwner && (
          <Link
            to="/lgas/new"
            className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ca8a04] text-[#0d0d0f] font-semibold rounded-lg shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
          >
            + Add LGA
          </Link>
        )}
      </div>

      {!loading && error && lgas.length === 0 && (
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">{error}</div>
      )}

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <form onSubmit={handleSearch} className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-[#ca8a04]/10 text-[#ca8a04]">🔍</div>
              <input
                type="text"
                placeholder="Search by name or code..."
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
        ) : lgas.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No LGAs found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">State</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Coordinator</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {lgas.map((lga: LGA) => (
                    <tr
                      key={lga.id}
                      onClick={() => navigate(`/lgas/${lga.id}`)}
                      className="hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">{getLgaName(lga)}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{getLgaStateName(lga)}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{lga.coordinator?.fullName || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${lga.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                          {lga.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                          <Link to={`/lgas/${lga.id}`} className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold">
                            View
                          </Link>
                          {isSuperAdmin && (
                            <button
                              onClick={() => openDeleteModal(lga)}
                              disabled={deleting === lga.id}
                              className="text-red-400 hover:text-red-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deleting === lga.id ? 'Deleting...' : 'Delete'}
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
              {lgas.map((lga: LGA) => (
                <div key={lga.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{getLgaName(lga)}</h3>
                    <div className="flex items-center gap-3">
                      <Link to={`/lgas/${lga.id}`} className="text-[#ca8a04] text-sm font-semibold">
                        View →
                      </Link>
                      {isSuperAdmin && (
                        <button
                          onClick={() => openDeleteModal(lga)}
                          disabled={deleting === lga.id}
                          className="text-red-400 text-sm font-semibold disabled:opacity-50"
                        >
                          {deleting === lga.id ? '...' : 'Delete'}
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#888] mb-2">{getLgaStateName(lga)}</p>
                  <div className="flex gap-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${lga.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                      {lga.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[#2a2a2e] text-[#888]">
                      {lga.coordinator?.fullName || 'No coordinator'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && lgas.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#2a2a2e] bg-[#1a1a1d]">
            <button
              onClick={() => setPage((p: number) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-[#888]">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
