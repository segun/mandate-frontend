import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { geodataService } from '../../services/geodata.service';
import type { GeoState, GeoLga } from '../../services/geodata.service';
import { lgasService } from '../../services/lgas.service';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';
import { toast } from '../../stores/toast.store';

export function CreateLGAPage() {
  const navigate = useNavigate();

  const [geoStates, setGeoStates] = useState<GeoState[]>([]);
  const [geoLgas, setGeoLgas] = useState<GeoLga[]>([]);

  // Tenant LGAs already added (by geoLgaId)
  const [existingGeoLgaIds, setExistingGeoLgaIds] = useState<string[]>([]);

  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedNewLgaIds, setSelectedNewLgaIds] = useState<string[]>([]);

  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await geodataService.getAllStates(1, DEFAULT_PAGE_LIMIT);
        setGeoStates(response.data);
      } catch {
        setError('Failed to load states');
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // Fetch tenant LGAs once to know which reference LGAs are already present
  useEffect(() => {
    const fetchExistingLgas = async () => {
      try {
        const pageSize = DEFAULT_PAGE_LIMIT;
        let page = 1;
        let collected: string[] = [];
        let hasMore = true;

        while (hasMore) {
          const response = await lgasService.getAll(undefined, page, pageSize);
          collected = collected.concat(response.data.map((lga) => String(lga.geoLgaId)));

          const total = response.meta?.total ?? Number.POSITIVE_INFINITY;
          hasMore = response.data.length === pageSize && collected.length < total;
          page += 1;
        }

        setExistingGeoLgaIds(collected);
      } catch {
        setError('Failed to load existing LGAs');
      }
    };

    fetchExistingLgas();
  }, []);

  useEffect(() => {
    if (!selectedStateId) {
      setGeoLgas([]);
      setSelectedNewLgaIds([]);
      return;
    }

    const fetchLgas = async () => {
      setLoadingLgas(true);
      try {
        const response = await geodataService.getLgasByState(selectedStateId, 1, DEFAULT_PAGE_LIMIT);
        setGeoLgas(response.data);
        setSelectedNewLgaIds([]);
      } catch {
        setError('Failed to load LGAs for the selected state');
      } finally {
        setLoadingLgas(false);
      }
    };

    fetchLgas();
  }, [selectedStateId]);

  const handleLgaToggle = (lgaId: string) => {
    setSelectedNewLgaIds((prev) =>
      prev.includes(lgaId) ? prev.filter((id) => id !== lgaId) : [...prev, lgaId]
    );
  };

  const handleSelectAll = () => {
    const selectableIds = geoLgas
      .filter((lga) => !existingGeoLgaIds.includes(String(lga.id)))
      .map((lga) => String(lga.id));
    const allSelectableChosen = selectableIds.length > 0 && selectableIds.every((id) => selectedNewLgaIds.includes(id));
    setSelectedNewLgaIds(allSelectableChosen ? [] : selectableIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedStateId) {
      setError('Please select a state');
      return;
    }

    if (selectedNewLgaIds.length === 0) {
      setError('Please select at least one new LGA to add');
      return;
    }

    const selectedCount = selectedNewLgaIds.length;
    toast.info(`Adding ${selectedCount} LGA(s)... This may take a moment.`, 0);
    setSubmitting(true);
    try {
      const result = await lgasService.addLgas(selectedNewLgaIds);
      const addedCount = Array.isArray(result?.added) ? result.added.length : 0;
      const skippedCount = Array.isArray(result?.skipped) ? result.skipped.length : 0;

      if (addedCount > 0) {
        setSuccess(
          `Successfully added ${addedCount} LGA(s)${skippedCount > 0 ? `. ${skippedCount} already existed.` : ''}`
        );
        toast.success(`Successfully added ${addedCount} LGA(s)${skippedCount > 0 ? `. ${skippedCount} already existed.` : ''}`);
        setSelectedNewLgaIds([]);
        setTimeout(() => navigate('/lgas'), 1200);
      } else if (skippedCount > 0) {
        setError(`All ${skippedCount} selected LGA(s) already exist in your tenant.`);
        toast.warning(`All ${skippedCount} selected LGA(s) already exist in your tenant.`);
      } else {
        setSuccess('LGAs added successfully');
        toast.success('LGAs added successfully');
        setTimeout(() => navigate('/lgas'), 1000);
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add LGAs';
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Add LGAs</h1>
          <p className="text-sm text-[#888] mt-1">Select LGAs from the reference database to add to your tenant</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1">
              <label htmlFor="state" className="text-sm font-medium text-white">
                Select State
              </label>
              <select
                id="state"
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                disabled={loadingStates}
                className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              >
                <option value="">{loadingStates ? 'Loading…' : '-- Select State --'}</option>
                {geoStates.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="lga" className="text-sm font-medium text-white">
                Select LGAs
              </label>
              <div className="rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] px-4 py-2.5 text-sm text-[#888]">
                {selectedStateId
                  ? loadingLgas
                    ? 'Loading LGAs…'
                    : (() => {
                        const total = geoLgas.length;
                        const available = geoLgas.filter((lga) => !existingGeoLgaIds.includes(String(lga.id))).length;
                        if (total === 0) return 'No LGAs found for the selected state';
                        if (available === 0) return `${total} reference LGA(s); all already added`;
                        return `${available} new available (${total} total)`;
                      })()
                  : 'Choose a state to load LGAs'}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">
                Select LGAs {selectedNewLgaIds.length > 0 && `(${selectedNewLgaIds.length} new selected)`}
              </label>
              {geoLgas.length > 0 && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  disabled={geoLgas.every((lga) => existingGeoLgaIds.includes(lga.id))}
                  className="text-sm text-[#ca8a04] hover:text-[#d4940a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {geoLgas
                    .filter((lga) => !existingGeoLgaIds.includes(lga.id))
                    .every((lga) => selectedNewLgaIds.includes(lga.id))
                    ? 'Deselect All New'
                    : 'Select All New'}
                </button>
              )}
            </div>

            {loadingLgas ? (
              <div className="p-4 text-center text-[#888]">Loading LGAs...</div>
            ) : !selectedStateId ? (
              <div className="p-4 text-center text-[#888] border border-dashed border-[#2a2a2e] rounded-lg">
                Select a state to view available LGAs
              </div>
            ) : geoLgas.length === 0 ? (
              <div className="p-4 text-center text-[#888] border border-dashed border-[#2a2a2e] rounded-lg">
                No LGAs found for the selected state
              </div>
            ) : (
              <div className="border border-[#2a2a2e] rounded-lg max-h-80 overflow-y-auto">
                {geoLgas.map((lga) => {
                  const geoId = String(lga.id);
                  const isExisting = existingGeoLgaIds.includes(geoId);
                  const isChecked = isExisting || selectedNewLgaIds.includes(geoId);

                  return (
                    <label
                      key={lga.id}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1a1a1d] cursor-pointer border-b border-[#2a2a2e] last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleLgaToggle(geoId)}
                        disabled={isExisting}
                        className="w-4 h-4 text-[#ca8a04] rounded focus:ring-[#ca8a04] bg-[#0d0d0f] border-[#2a2a2e] accent-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      <span className="text-sm text-white">
                        {lga.name}
                        {isExisting && (
                          <span className="ml-2 text-xs text-[#888]">(Already added)</span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting || selectedNewLgaIds.length === 0}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Adding…' : `Add ${selectedNewLgaIds.length || ''} LGA${selectedNewLgaIds.length !== 1 ? 's' : ''}`}
            </button>
            <button
              type="button"
              onClick={() => navigate('/lgas')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
