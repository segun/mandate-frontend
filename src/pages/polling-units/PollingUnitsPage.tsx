import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { PollingUnit, PaginatedResponse } from '../../services/polling-units.service';
import { pollingUnitsService, getPollingUnitWardName, getPollingUnitName, getPollingUnitCode } from '../../services/polling-units.service';
import { wardsService } from '../../services/wards.service';
import type { Ward } from '../../services/wards.service';
import { useAuthStore } from '../../stores/auth.store';
import { ConfirmDialog } from '../../components/ConfirmDialog';

export function PollingUnitsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const [pollingUnits, setPollingUnits] = useState<PollingUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [wardMap, setWardMap] = useState<Map<string, string>>(new Map());
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; unit: PollingUnit | null }>({ isOpen: false, unit: null });

  const fetchPollingUnits = useCallback(async () => {
    setLoading(true);
    try {
      // Use name filter for search - only search if 3+ characters
      const searchTerm = search.length >= 3 ? search : undefined;
      const response: PaginatedResponse<PollingUnit> = await pollingUnitsService.getAll(page, 50, undefined, searchTerm);
      setPollingUnits(response.data);
      setTotalPages(response.meta?.totalPages || 1);
      setError('');
      
      // Fetch ward details for each unique ward ID
      const uniqueWardIds = [...new Set(response.data.map(unit => unit.wardId).filter(Boolean))];
      const wardNameMap = new Map<string, string>();
      
      await Promise.all(
        uniqueWardIds.map(async (wardId) => {
          try {
            const ward = await wardsService.getById(wardId);
            if (ward.geoWard?.name) {
              wardNameMap.set(wardId, ward.geoWard.name);
            }
          } catch {
            // If ward fetch fails, ignore and continue
            wardNameMap.set(wardId, 'N/A');
          }
        })
      );
      
      setWardMap(wardNameMap);
    } catch {
      setError('Failed to fetch polling units');
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchPollingUnits();
  }, [fetchPollingUnits]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPollingUnits();
  };

  const openDeleteModal = (unit: PollingUnit) => {
    setDeleteModal({ isOpen: true, unit });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, unit: null });
  };

  const handleDelete = async () => {
    const unit = deleteModal.unit;
    if (!unit) return;

    setDeleting(unit.id);
    closeDeleteModal();
    try {
      await pollingUnitsService.delete(unit.id);
      setPollingUnits((prev) => prev.filter((item) => item.id !== unit.id));
    } catch {
      setError(`Failed to delete ${getPollingUnitName(unit)}`);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="Delete Polling Unit"
        message={
          <>
            Are you sure you want to delete <span className="text-[#ca8a04] font-medium">"{deleteModal.unit ? getPollingUnitName(deleteModal.unit) : ''}"</span>?
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Polling Units</h1>
          <p className="text-sm text-[#888]">Search and manage polling units</p>
        </div>
        <Link
          to="/polling-units/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ca8a04] text-[#0d0d0f] font-semibold rounded-lg shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
        >
          + Add Polling Unit
        </Link>
      </div>

      {!loading && error && pollingUnits.length === 0 && (
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
        ) : pollingUnits.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No polling units found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Ward</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Supervisor</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {pollingUnits.map((unit) => (
                    <tr 
                      key={unit.id} 
                      onClick={() => navigate(`/polling-units/${unit.id}`)}
                      className="hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">{getPollingUnitName(unit)}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{getPollingUnitCode(unit)}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{wardMap.get(unit.wardId) || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{unit.supervisor?.fullName || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${unit.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                          {unit.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                          <Link 
                            to={`/polling-units/${unit.id}`} 
                            className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold"
                          >
                            View
                          </Link>
                          {isSuperAdmin && (
                            <button
                              onClick={() => openDeleteModal(unit)}
                              disabled={deleting === unit.id}
                              className="text-red-400 hover:text-red-300 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deleting === unit.id ? 'Deleting...' : 'Delete'}
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
              {pollingUnits.map((unit) => (
                <div 
                  key={unit.id} 
                  className="p-4 cursor-pointer hover:bg-[#1a1a1d]/50 transition-colors"
                  onClick={() => navigate(`/polling-units/${unit.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{getPollingUnitName(unit)}</h3>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        to={`/polling-units/${unit.id}`} 
                        className="text-[#ca8a04] text-sm font-semibold"
                      >
                        View →
                      </Link>
                      {isSuperAdmin && (
                        <button
                          onClick={() => openDeleteModal(unit)}
                          disabled={deleting === unit.id}
                          className="text-red-400 text-sm font-semibold disabled:opacity-50"
                        >
                          {deleting === unit.id ? '...' : 'Delete'}
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#888] mb-2">{getPollingUnitCode(unit)}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-[#2a2a2e] text-[#888]">
                      Ward: {wardMap.get(unit.wardId) || 'N/A'}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${unit.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                      {unit.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {!loading && pollingUnits.length > 0 && (
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
