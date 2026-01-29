import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { statesService } from '../../services/states.service';
import { geodataService } from '../../services/geodata.service';
import type { GeoState } from '../../services/geodata.service';

export function CreateStatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Geo data for selection
  const [geoStates, setGeoStates] = useState<GeoState[]>([]);

  // Selections
  const [selectedStateIds, setSelectedStateIds] = useState<string[]>([]);

  // Loading states
  const [loadingStates, setLoadingStates] = useState(true);

  // Fetch geo states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await geodataService.getAllStates(1, 50);
        setGeoStates(response.data);
      } catch {
        setError('Failed to load states');
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  const handleStateToggle = (stateId: string) => {
    setSelectedStateIds((prev) =>
      prev.includes(stateId)
        ? prev.filter((id) => id !== stateId)
        : [...prev, stateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStateIds.length === geoStates.length) {
      setSelectedStateIds([]);
    } else {
      setSelectedStateIds(geoStates.map((s) => s.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selectedStateIds.length === 0) {
      setError('Please select at least one state to add');
      return;
    }

    setLoading(true);
    try {
      const result = await statesService.addStates(selectedStateIds);
      const addedCount = Array.isArray(result?.added) ? result.added.length : 0;
      const skippedCount = Array.isArray(result?.skipped) ? result.skipped.length : 0;

      if (addedCount > 0) {
        setSuccess(`Successfully added ${addedCount} state(s)${skippedCount > 0 ? `. ${skippedCount} already existed.` : ''}`);
        setSelectedStateIds([]);
        setTimeout(() => navigate('/states'), 1500);
      } else if (skippedCount > 0) {
        setError(`All ${skippedCount} selected state(s) already exist in your tenant.`);
      } else {
        // Fallback success case when response structure is different
        setSuccess('States added successfully');
        setSelectedStateIds([]);
        setTimeout(() => navigate('/states'), 1500);
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add states';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Add States</h1>
          <p className="text-sm text-slate-600 mt-1">Select states from the reference database to add to your tenant</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
        >
          ← Back
        </button>
      </div>

      {error && (
        <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">{error}</div>
      )}
      {success && (
        <div className="mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg p-4">{success}</div>
      )}

      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 p-6 sm:p-8">

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* State Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Select States {selectedStateIds.length > 0 && `(${selectedStateIds.length} selected)`}
              </label>
              {geoStates.length > 0 && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-secondary hover:underline"
                >
                  {selectedStateIds.length === geoStates.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>

            {loadingStates ? (
              <div className="p-4 text-center text-slate-500">Loading states...</div>
            ) : geoStates.length === 0 ? (
              <div className="p-4 text-center text-slate-500 border border-dashed border-slate-200 rounded-lg">
                No states found in the reference database
              </div>
            ) : (
              <div className="border border-slate-200 rounded-lg max-h-96 overflow-y-auto">
                {geoStates.map((state) => (
                  <label
                    key={state.id}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStateIds.includes(state.id)}
                      onChange={() => handleStateToggle(state.id)}
                      className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                    />
                    <span className="text-sm text-slate-700">{state.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading || selectedStateIds.length === 0}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-800 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding…' : `Add ${selectedStateIds.length || ''} State${selectedStateIds.length !== 1 ? 's' : ''}`}
            </button>
            <button
              type="button"
              onClick={() => navigate('/states')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
