import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import {
  platformGeodataService,
  type GeodataConflictError,
  type GeodataItem,
  type GeoLevel,
} from '../../services/platform-geodata.service';
import { toast } from '../../stores/toast.store';

const levelOptions: Array<{ value: GeoLevel; label: string }> = [
  { value: 'state', label: 'State' },
  { value: 'lga', label: 'LGA' },
  { value: 'ward', label: 'Ward' },
  { value: 'polling-unit', label: 'Polling Unit' },
];

const levelLabelMap: Record<GeoLevel, string> = {
  state: 'State',
  lga: 'LGA',
  ward: 'Ward',
  'polling-unit': 'Polling Unit',
};

export function PlatformGeoDataPage() {
  const navigate = useNavigate();
  const [level, setLevel] = useState<GeoLevel>('state');
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<GeodataItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteTarget, setDeleteTarget] = useState<GeodataItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [selectedState, setSelectedState] = useState<{ id: string; name: string } | null>(null);
  const [selectedLga, setSelectedLga] = useState<{ id: string; name: string } | null>(null);
  const [selectedWard, setSelectedWard] = useState<{ id: string; name: string } | null>(null);

  const fetchItems = useCallback(async () => {
    setLoadingItems(true);
    try {
      const response = await platformGeodataService.list(level, {
        page,
        limit: 20,
        search: search.trim() || undefined,
        stateId: level !== 'state' ? selectedState?.id : undefined,
        lgaId: level === 'ward' || level === 'polling-unit' ? selectedLga?.id : undefined,
        wardId: level === 'polling-unit' ? selectedWard?.id : undefined,
      });
      setItems(response.data);
      setTotalPages(response.meta.totalPages || 1);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load geodata';
      toast.error(message);
      setItems([]);
    } finally {
      setLoadingItems(false);
    }
  }, [level, page, search, selectedState?.id, selectedLga?.id, selectedWard?.id]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await platformGeodataService.remove(level, deleteTarget.id);
      toast.success('Geodata deleted successfully');
      setDeleteTarget(null);
      fetchItems();
    } catch (err: unknown) {
      const responseData = (err as { response?: { data?: GeodataConflictError } })?.response?.data;
      const message = responseData?.message || 'Failed to delete geodata';

      if ((err as { response?: { status?: number } })?.response?.status === 409 && responseData?.details?.references) {
        const references = Object.entries(responseData.details.references)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ');
        toast.error(`${message} (${references})`, 8000);
      } else {
        toast.error(message);
      }
    } finally {
      setDeleting(false);
    }
  };

  const canDrillDown = level !== 'polling-unit';

  const handleLevelChange = (nextLevel: GeoLevel) => {
    setLevel(nextLevel);
    setPage(1);
    setSearch('');

    if (nextLevel === 'state') {
      setSelectedState(null);
      setSelectedLga(null);
      setSelectedWard(null);
      return;
    }

    if (nextLevel === 'lga') {
      setSelectedLga(null);
      setSelectedWard(null);
      return;
    }

    if (nextLevel === 'ward') {
      setSelectedWard(null);
    }
  };

  const handleDrilldown = (item: GeodataItem) => {
    if (level === 'state') {
      setSelectedState({ id: item.id, name: item.name });
      setSelectedLga(null);
      setSelectedWard(null);
      setLevel('lga');
      setPage(1);
      setSearch('');
      return;
    }

    if (level === 'lga') {
      setSelectedLga({ id: item.id, name: item.name });
      setSelectedWard(null);
      if (item.stateId) {
        setSelectedState((prev) => prev ?? { id: item.stateId as string, name: selectedState?.name || 'Selected State' });
      }
      setLevel('ward');
      setPage(1);
      setSearch('');
      return;
    }

    if (level === 'ward') {
      setSelectedWard({ id: item.id, name: item.name });
      if (item.lgaId) {
        setSelectedLga((prev) => prev ?? { id: item.lgaId as string, name: selectedLga?.name || 'Selected LGA' });
      }
      if (item.stateId) {
        setSelectedState((prev) => prev ?? { id: item.stateId as string, name: selectedState?.name || 'Selected State' });
      }
      setLevel('polling-unit');
      setPage(1);
      setSearch('');
    }
  };

  const handleBackOneLevel = () => {
    if (level === 'polling-unit') {
      setLevel('ward');
      setSelectedWard(null);
      setPage(1);
      setSearch('');
      return;
    }

    if (level === 'ward') {
      setLevel('lga');
      setSelectedLga(null);
      setSelectedWard(null);
      setPage(1);
      setSearch('');
      return;
    }

    if (level === 'lga') {
      setLevel('state');
      setSelectedState(null);
      setSelectedLga(null);
      setSelectedWard(null);
      setPage(1);
      setSearch('');
    }
  };

  const drilldownLabel =
    level === 'state'
      ? 'View LGAs'
      : level === 'lga'
        ? 'View Wards'
        : level === 'ward'
          ? 'View Polling Units'
          : '';

  const addNewLabel = `Add New ${levelLabelMap[level]}`;

  const openCreatePage = () => {
    const params = new URLSearchParams();
    params.set('level', level);
    if (selectedState?.id) params.set('stateId', selectedState.id);
    if (selectedLga?.id) params.set('lgaId', selectedLga.id);
    if (selectedWard?.id) params.set('wardId', selectedWard.id);
    navigate(`/platform-owner/geodata/new?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Geo Data</h1>
          <p className="text-sm text-[#888] mt-1">Manage geodata levels and process async CSV imports.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openCreatePage}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a]"
          >
            {addNewLabel}
          </button>
          <button
            type="button"
            onClick={() => navigate('/platform-owner/geodata/csv-import')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#ca8a04]/60 bg-[#1a1a1d] text-[#ca8a04] font-semibold hover:bg-[#2a2a2e] hover:border-[#ca8a04]"
          >
            Add from CSV
          </button>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Geodata</h2>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={level}
              onChange={(e) => handleLevelChange(e.target.value as GeoLevel)}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            >
              {levelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Search by name"
              className="px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            />

            <button
              type="button"
              onClick={fetchItems}
              className="px-4 py-2.5 rounded-lg border border-[#ca8a04]/60 bg-[#1a1a1d] text-[#ca8a04] font-semibold hover:bg-[#2a2a2e] hover:border-[#ca8a04]"
            >
              Refresh
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[#888]">
            <span className="px-2 py-1 rounded bg-[#1a1a1d] border border-[#2a2a2e]">Level: {level}</span>
            {selectedState && (
              <span className="px-2 py-1 rounded bg-[#1a1a1d] border border-[#2a2a2e]">State: {selectedState.name}</span>
            )}
            {selectedLga && <span className="px-2 py-1 rounded bg-[#1a1a1d] border border-[#2a2a2e]">LGA: {selectedLga.name}</span>}
            {selectedWard && <span className="px-2 py-1 rounded bg-[#1a1a1d] border border-[#2a2a2e]">Ward: {selectedWard.name}</span>}
            {level !== 'state' && (
              <button
                type="button"
                onClick={handleBackOneLevel}
                className="px-2 py-1 rounded border border-[#2a2a2e] bg-[#1a1a1d] text-[#ca8a04] hover:bg-[#2a2a2e]"
              >
                Back one level
              </button>
            )}
          </div>

          {loadingItems ? (
            <div className="text-[#888]">Loading geodata...</div>
          ) : items.length === 0 ? (
            <div className="text-[#888]">No geodata found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2e]">
                  <tr>
                    <th className="text-left py-2 text-sm text-white">Name</th>
                    <th className="text-left py-2 text-sm text-white">Code</th>
                    <th className="text-left py-2 text-sm text-white">ID</th>
                    {canDrillDown && <th className="text-left py-2 text-sm text-white">View</th>}
                    <th className="text-left py-2 text-sm text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.id}
                      onClick={canDrillDown ? () => handleDrilldown(item) : undefined}
                      className={`border-b border-[#2a2a2e]/60 ${canDrillDown ? 'cursor-pointer hover:bg-[#1a1a1d]/50' : ''}`}
                    >
                      <td className="py-2 text-sm text-[#ddd]">{item.name}</td>
                      <td className="py-2 text-sm text-[#bbb]">{item.code || '-'}</td>
                      <td className="py-2 text-xs text-[#888]">{item.id}</td>
                      {canDrillDown && (
                        <td className="py-2 text-sm" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleDrilldown(item)}
                            className="text-[#ca8a04] hover:text-[#d4940a] font-semibold"
                          >
                            {drilldownLabel}
                          </button>
                        </td>
                      )}
                      <td className="py-2 text-sm" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          className="text-red-400 hover:text-red-300 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loadingItems && items.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-[#888]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Geodata"
        message={
          <>
            Are you sure you want to delete <span className="text-[#ca8a04] font-medium">"{deleteTarget?.name || ''}"</span>?
          </>
        }
        confirmLabel={deleting ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
