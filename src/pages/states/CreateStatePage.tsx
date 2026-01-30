import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { statesService } from '../../services/states.service';
import { geodataService } from '../../services/geodata.service';
import type { GeoState } from '../../services/geodata.service';
import { toast } from '../../stores/toast.store';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';

export function CreateStatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Geo data for selection
  const [geoStates, setGeoStates] = useState<GeoState[]>([]);

  // States already added to the tenant (by geoStateId)
  const [existingGeoStateIds, setExistingGeoStateIds] = useState<string[]>([]);

  // Selections
  const [selectedNewStateIds, setSelectedNewStateIds] = useState<string[]>([]);

  // Loading states
  const [loadingStates, setLoadingStates] = useState(true);

  // Fetch geo states on mount
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

  // Fetch tenant states to pre-check already-added states
  useEffect(() => {
    const fetchExistingStates = async () => {
      try {
        const pageSize = DEFAULT_PAGE_LIMIT;
        let page = 1;
        let collected: string[] = [];
        let hasMore = true;

        while (hasMore) {
          const response = await statesService.getAll(page, pageSize);
          collected = collected.concat(response.data.map((state) => state.geoStateId));

          const total = response.meta?.total ?? collected.length;
          hasMore = collected.length < total && response.data.length === pageSize;
          page += 1;
        }

        setExistingGeoStateIds(collected);
      } catch {
        setError('Failed to load existing tenant states');
      }
    };

    fetchExistingStates();
  }, []);

  const handleStateToggle = (stateId: string) => {
    setSelectedNewStateIds((prev) =>
      prev.includes(stateId)
        ? prev.filter((id) => id !== stateId)
        : [...prev, stateId]
    );
  };

  const handleSelectAll = () => {
    const selectableStateIds = geoStates
      .filter((state) => !existingGeoStateIds.includes(state.id))
      .map((state) => state.id);

    const allSelectableChosen = selectableStateIds.length > 0 && selectableStateIds.every((id) => selectedNewStateIds.includes(id));

    setSelectedNewStateIds(allSelectableChosen ? [] : selectableStateIds);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selectedNewStateIds.length === 0) {
      setError('Please select at least one new state to add');
      return;
    }

    // Show immediate feedback
    const selectedCount = selectedNewStateIds.length;
    toast.info(`Adding ${selectedCount} state(s)... This may take a moment.`, 0); // Persistent until done

    setLoading(true);
    try {
      const result = await statesService.addStates(selectedNewStateIds);
      const addedCount = Array.isArray(result?.added) ? result.added.length : 0;
      const skippedCount = Array.isArray(result?.skipped) ? result.skipped.length : 0;

      if (addedCount > 0) {
        toast.success(`Successfully added ${addedCount} state(s)${skippedCount > 0 ? `. ${skippedCount} already existed.` : ''}`);
        setSelectedNewStateIds([]);
        // Keep existing selections intact since they are disabled/auto-checked
        setTimeout(() => navigate('/states'), 1000);
      } else if (skippedCount > 0) {
        toast.warning(`All ${skippedCount} selected state(s) already exist in your tenant.`);
        setError(`All ${skippedCount} selected state(s) already exist in your tenant.`);
      } else {
        // Fallback success case when response structure is different
        toast.success('States added successfully! Redirecting...');
        setSelectedNewStateIds([]);
        setTimeout(() => navigate('/states'), 1000);
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add states';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Add States</h1>
          <p className="text-sm text-[#888] mt-1">Select states from the reference database to add to your tenant</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
        >
          ← Back
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">{error}</div>
      )}
      {success && (
        <div className="mb-4 text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-4">{success}</div>
      )}

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* State Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white">
                Select States {selectedNewStateIds.length > 0 && `(${selectedNewStateIds.length} new selected)`}
              </label>
              {geoStates.length > 0 && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  disabled={geoStates.every((state) => existingGeoStateIds.includes(state.id))}
                  className="text-sm text-[#ca8a04] hover:text-[#d4940a] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {geoStates
                    .filter((state) => !existingGeoStateIds.includes(state.id))
                    .every((state) => selectedNewStateIds.includes(state.id))
                    ? 'Deselect All New'
                    : 'Select All New'}
                </button>
              )}
            </div>

            {loadingStates ? (
              <div className="p-4 text-center text-[#888]">Loading states...</div>
            ) : geoStates.length === 0 ? (
              <div className="p-4 text-center text-[#888] border border-dashed border-[#2a2a2e] rounded-lg">
                No states found in the reference database
              </div>
            ) : (
              <div className="border border-[#2a2a2e] rounded-lg max-h-96 overflow-y-auto">
                {geoStates.map((state) => {
                  const isExisting = existingGeoStateIds.includes(state.id);
                  const isChecked = isExisting || selectedNewStateIds.includes(state.id);

                  return (
                    <label
                      key={state.id}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1a1a1d] cursor-pointer border-b border-[#2a2a2e] last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleStateToggle(state.id)}
                        disabled={isExisting}
                        className="w-4 h-4 text-[#ca8a04] rounded focus:ring-[#ca8a04] accent-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed"
                      />
                      <span className="text-sm text-white">
                        {state.name}
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
              disabled={loading || selectedNewStateIds.length === 0}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding…' : `Add ${selectedNewStateIds.length || ''} State${selectedNewStateIds.length !== 1 ? 's' : ''}`}
            </button>
            <button
              type="button"
              onClick={() => navigate('/states')}
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
