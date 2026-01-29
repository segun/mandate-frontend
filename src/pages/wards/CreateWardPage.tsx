import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wardsService } from '../../services/wards.service';
import { geodataService } from '../../services/geodata.service';
import type { GeoState, GeoLga, GeoWard } from '../../services/geodata.service';

export function CreateWardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Geo data for selection
  const [geoStates, setGeoStates] = useState<GeoState[]>([]);
  const [geoLgas, setGeoLgas] = useState<GeoLga[]>([]);
  const [geoWards, setGeoWards] = useState<GeoWard[]>([]);

  // Selections
  const [selectedStateId, setSelectedStateId] = useState<string>('');
  const [selectedLgaId, setSelectedLgaId] = useState<string>('');
  const [selectedWardIds, setSelectedWardIds] = useState<string[]>([]);

  // Loading states
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Fetch geo states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await geodataService.getAllStates(1, 100);
        setGeoStates(response.data);
      } catch {
        setError('Failed to load states');
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (!selectedStateId) {
      setGeoLgas([]);
      setGeoWards([]);
      setSelectedLgaId('');
      setSelectedWardIds([]);
      return;
    }

    const fetchLgas = async () => {
      setLoadingLgas(true);
      try {
        const response = await geodataService.getLgasByState(selectedStateId, 1, 200);
        setGeoLgas(response.data);
        setSelectedLgaId('');
        setGeoWards([]);
        setSelectedWardIds([]);
      } catch {
        setError('Failed to load LGAs');
      } finally {
        setLoadingLgas(false);
      }
    };
    fetchLgas();
  }, [selectedStateId]);

  // Fetch wards when LGA changes
  useEffect(() => {
    if (!selectedLgaId) {
      setGeoWards([]);
      setSelectedWardIds([]);
      return;
    }

    const fetchWards = async () => {
      setLoadingWards(true);
      try {
        const response = await geodataService.getWardsByLga(selectedLgaId, 1, 200);
        setGeoWards(response.data);
        setSelectedWardIds([]);
      } catch {
        setError('Failed to load wards');
      } finally {
        setLoadingWards(false);
      }
    };
    fetchWards();
  }, [selectedLgaId]);

  const handleWardToggle = (wardId: string) => {
    setSelectedWardIds((prev) =>
      prev.includes(wardId)
        ? prev.filter((id) => id !== wardId)
        : [...prev, wardId]
    );
  };

  const handleSelectAll = () => {
    if (selectedWardIds.length === geoWards.length) {
      setSelectedWardIds([]);
    } else {
      setSelectedWardIds(geoWards.map((w) => w.id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selectedWardIds.length === 0) {
      setError('Please select at least one ward to add');
      return;
    }

    setLoading(true);
    try {
      const result = await wardsService.addWards(selectedWardIds);
      const addedCount = result.added?.length || 0;
      const skippedCount = result.skipped?.length || 0;

      if (addedCount > 0) {
        setSuccess(`Successfully added ${addedCount} ward(s)${skippedCount > 0 ? `. ${skippedCount} already existed.` : ''}`);
        setSelectedWardIds([]);
        setTimeout(() => navigate('/wards'), 1500);
      } else if (skippedCount > 0) {
        setError(`All ${skippedCount} selected ward(s) already exist in your tenant.`);
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add wards';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Add Wards</h1>
          <p className="text-sm text-slate-600 mt-1">Select wards from the reference database to add to your tenant</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 p-6 sm:p-8">
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* State Selection */}
            <div className="space-y-1">
              <label htmlFor="state" className="text-sm font-medium text-slate-700">
                Select State
              </label>
              <select
                id="state"
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                disabled={loadingStates}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              >
                <option value="">{loadingStates ? 'Loading...' : '-- Select State --'}</option>
                {geoStates.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA Selection */}
            <div className="space-y-1">
              <label htmlFor="lga" className="text-sm font-medium text-slate-700">
                Select LGA
              </label>
              <select
                id="lga"
                value={selectedLgaId}
                onChange={(e) => setSelectedLgaId(e.target.value)}
                disabled={!selectedStateId || loadingLgas}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent disabled:bg-slate-100"
              >
                <option value="">{loadingLgas ? 'Loading...' : '-- Select LGA --'}</option>
                {geoLgas.map((lga) => (
                  <option key={lga.id} value={lga.id}>
                    {lga.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ward Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Select Wards {selectedWardIds.length > 0 && `(${selectedWardIds.length} selected)`}
              </label>
              {geoWards.length > 0 && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-secondary hover:underline"
                >
                  {selectedWardIds.length === geoWards.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>

            {loadingWards ? (
              <div className="p-4 text-center text-slate-500">Loading wards...</div>
            ) : !selectedLgaId ? (
              <div className="p-4 text-center text-slate-400 border border-dashed border-slate-200 rounded-lg">
                Select a state and LGA to view available wards
              </div>
            ) : geoWards.length === 0 ? (
              <div className="p-4 text-center text-slate-500 border border-dashed border-slate-200 rounded-lg">
                No wards found for the selected LGA
              </div>
            ) : (
              <div className="border border-slate-200 rounded-lg max-h-64 overflow-y-auto">
                {geoWards.map((ward) => (
                  <label
                    key={ward.id}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                  >
                    <input
                      type="checkbox"
                      checked={selectedWardIds.includes(ward.id)}
                      onChange={() => handleWardToggle(ward.id)}
                      className="w-4 h-4 text-secondary rounded focus:ring-secondary"
                    />
                    <span className="text-sm text-slate-700">{ward.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading || selectedWardIds.length === 0}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-800 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding…' : `Add ${selectedWardIds.length || ''} Ward${selectedWardIds.length !== 1 ? 's' : ''}`}
            </button>
            <button
              type="button"
              onClick={() => navigate('/wards')}
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
