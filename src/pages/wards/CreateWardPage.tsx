import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { wardsService } from '../../services/wards.service';
import { geodataService } from '../../services/geodata.service';
import type { GeoState, GeoLga, GeoWard } from '../../services/geodata.service';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';
import { toast } from '../../stores/toast.store';

export function CreateWardPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'geo-id' | 'by-name'>('geo-id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Geo ID mode state
  const [geoStates, setGeoStates] = useState<GeoState[]>([]);
  const [geoLgas, setGeoLgas] = useState<GeoLga[]>([]);
  const [geoWards, setGeoWards] = useState<GeoWard[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<string>('');
  const [selectedLgaId, setSelectedLgaId] = useState<string>('');
  const [existingGeoWardIds, setExistingGeoWardIds] = useState<string[]>([]);
  const [selectedNewWardIds, setSelectedNewWardIds] = useState<string[]>([]);

  // By Name mode state
  const [nameFormStateId, setNameFormStateId] = useState<string>('');
  const [nameFormLgaId, setNameFormLgaId] = useState<string>('');
  const [nameFormLgas, setNameFormLgas] = useState<GeoLga[]>([]);
  const [wardName, setWardName] = useState('');

  // Loading states
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [loadingNameFormLgas, setLoadingNameFormLgas] = useState(false);

  // Fetch geo states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await geodataService.getAllStates(1, DEFAULT_PAGE_LIMIT);
        setGeoStates(response.data.data);
      } catch {
        setError('Failed to load states');
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch tenant wards once to know which reference wards are already present
  useEffect(() => {
    const fetchExistingWards = async () => {
      try {
        const pageSize = DEFAULT_PAGE_LIMIT;
        let page = 1;
        let collected: string[] = [];
        let hasMore = true;

        while (hasMore) {
          const response = await wardsService.getAll(page, pageSize);
          collected = collected.concat(response.data.map((ward) => String(ward.geoWardId)));

          const total = response.meta?.total ?? Number.POSITIVE_INFINITY;
          hasMore = response.data.length === pageSize && collected.length < total;
          page += 1;
        }

        setExistingGeoWardIds(collected);
      } catch {
        setError('Failed to load existing wards');
      }
    };

    fetchExistingWards();
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (!selectedStateId) {
      setGeoLgas([]);
      setGeoWards([]);
      setSelectedLgaId('');
      setSelectedNewWardIds([]);
      return;
    }

    const fetchLgas = async () => {
      setLoadingLgas(true);
      try {
        const response = await geodataService.getLgasByState(selectedStateId, 1, DEFAULT_PAGE_LIMIT);
        setGeoLgas(response.data.data);
        setSelectedLgaId('');
        setGeoWards([]);
        setSelectedNewWardIds([]);
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
      setSelectedNewWardIds([]);
      return;
    }

    const fetchWards = async () => {
      setLoadingWards(true);
      try {
        const response = await geodataService.getWardsByLga(selectedLgaId, 1, DEFAULT_PAGE_LIMIT);
        setGeoWards(response.data.data);
        setSelectedNewWardIds([]);
      } catch {
        setError('Failed to load wards');
      } finally {
        setLoadingWards(false);
      }
    };
    fetchWards();
  }, [selectedLgaId]);

  const handleWardToggle = (wardId: string) => {
    setSelectedNewWardIds((prev) =>
      prev.includes(wardId) ? prev.filter((id) => id !== wardId) : [...prev, wardId]
    );
  };

  // Effect for name-by-name mode: fetch LGAs when state changes
  useEffect(() => {
    if (!nameFormStateId) {
      setNameFormLgas([]);
      setNameFormLgaId('');
      return;
    }

    const fetchLgas = async () => {
      setLoadingNameFormLgas(true);
      try {
        const response = await geodataService.getLgasByState(nameFormStateId, 1, DEFAULT_PAGE_LIMIT);
        setNameFormLgas(response.data.data);
        setNameFormLgaId('');
      } catch {
        setError('Failed to load LGAs');
      } finally {
        setLoadingNameFormLgas(false);
      }
    };
    fetchLgas();
  }, [nameFormStateId]);

  const handleSelectAll = () => {
    const selectableIds = geoWards
      .filter((ward) => !existingGeoWardIds.includes(String(ward.id)))
      .map((ward) => String(ward.id));
    const allSelectableChosen =
      selectableIds.length > 0 && selectableIds.every((id) => selectedNewWardIds.includes(id));

    setSelectedNewWardIds(allSelectableChosen ? [] : selectableIds);
  };

  const handleSubmitGeoId = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selectedNewWardIds.length === 0) {
      setError('Please select at least one new ward to add');
      return;
    }

    const selectedCount = selectedNewWardIds.length;
    toast.info(`Adding ${selectedCount} ward(s)... This may take a moment.`, 0);

    setLoading(true);
    try {
      const result = await wardsService.addWards(selectedNewWardIds);
      const addedCount = result.added?.length || 0;
      const skippedCount = result.skipped?.length || 0;

      if (addedCount > 0) {
        const message = `Successfully added ${addedCount} ward(s)${skippedCount > 0 ? `. ${skippedCount} already existed.` : ''}`;
        setSuccess(message);
        toast.success(message);
        setSelectedNewWardIds([]);
        setTimeout(() => navigate('/wards'), 1200);
      } else if (skippedCount > 0) {
        const message = `All ${skippedCount} selected ward(s) already exist in this organization.`;
        setError(message);
        toast.warning(message);
      } else {
        setSuccess('Wards added successfully');
        toast.success('Wards added successfully');
        setTimeout(() => navigate('/wards'), 1000);
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add wards';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitByName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nameFormStateId) {
      setError('Please select a state');
      return;
    }

    if (!nameFormLgaId) {
      setError('Please select an LGA');
      return;
    }

    if (!wardName.trim()) {
      setError('Please enter a ward name');
      return;
    }

    toast.info('Creating ward... This may take a moment.', 0);
    setLoading(true);
    try {
      await wardsService.createWardByName(wardName, nameFormStateId, nameFormLgaId);
      toast.success('Ward created successfully! Redirecting...');
      setWardName('');
      setNameFormStateId('');
      setNameFormLgaId('');
      setTimeout(() => navigate('/wards'), 1000);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create ward';
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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Add Wards</h1>
          <p className="text-sm text-[#888] mt-1">Add wards to your platform</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#ca8a04] bg-transparent text-[#ca8a04] font-semibold hover:bg-[#ca8a04]/10 transition-colors"
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

        {/* Mode Tabs */}
        <div className="flex gap-4 mb-6 border-b border-[#2a2a2e]">
          <button
            onClick={() => setMode('geo-id')}
            className={`px-4 py-2.5 font-semibold text-sm border-b-2 transition-colors ${
              mode === 'geo-id'
                ? 'border-[#ca8a04] text-[#ca8a04]'
                : 'border-transparent text-[#888] hover:text-white'
            }`}
          >
            Add Ward
          </button>
          <button
            onClick={() => setMode('by-name')}
            className={`px-4 py-2.5 font-semibold text-sm border-b-2 transition-colors ${
              mode === 'by-name'
                ? 'border-[#ca8a04] text-[#ca8a04]'
                : 'border-transparent text-[#888] hover:text-white'
            }`}
          >
            Add by Name
          </button>
        </div>

        {/* Add by Geo ID Mode */}
        {mode === 'geo-id' && (
          <form onSubmit={handleSubmitGeoId} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* State Selection */}
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
                <label htmlFor="lga" className="text-sm font-medium text-white">
                  Select LGA
                </label>
                <select
                  id="lga"
                  value={selectedLgaId}
                  onChange={(e) => setSelectedLgaId(e.target.value)}
                  disabled={!selectedStateId || loadingLgas}
                  className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent disabled:bg-[#1a1a1d] disabled:text-[#666]"
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
                <label className="text-sm font-medium text-white">
                  Select Wards {selectedNewWardIds.length > 0 && `(${selectedNewWardIds.length} new selected)`}
                </label>
                {geoWards.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    disabled={geoWards.every((ward) => existingGeoWardIds.includes(String(ward.id)))}
                    className="text-sm text-[#ca8a04] hover:text-[#d4940a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {geoWards
                      .filter((ward) => !existingGeoWardIds.includes(String(ward.id)))
                      .every((ward) => selectedNewWardIds.includes(String(ward.id)))
                      ? 'Deselect All New'
                      : 'Select All New'}
                  </button>
                )}
              </div>

              {loadingWards ? (
                <div className="p-4 text-center text-[#888]">Loading wards...</div>
              ) : !selectedLgaId ? (
                <div className="p-4 text-center text-[#888] border border-dashed border-[#2a2a2e] rounded-lg">
                  Select a state and LGA to view available wards
                </div>
              ) : geoWards.length === 0 ? (
                <div className="p-4 text-center text-[#888] border border-dashed border-[#2a2a2e] rounded-lg">
                  No wards found for the selected LGA
                </div>
              ) : (
                <div className="border border-[#2a2a2e] rounded-lg max-h-64 overflow-y-auto">
                  <div className="px-4 py-2 text-sm text-[#888] border-b border-[#2a2a2e] bg-[#0f0f12]">
                    {(() => {
                      const total = geoWards.length;
                      const available = geoWards.filter((ward) => !existingGeoWardIds.includes(String(ward.id))).length;
                      if (total === 0) return null;
                      if (available === 0) return `${total} reference ward(s); all already added`;
                      return `${available} new available (${total} total)`;
                    })()}
                  </div>
                  {geoWards.map((ward) => {
                    const geoId = String(ward.id);
                    const isExisting = existingGeoWardIds.includes(geoId);
                    const isChecked = isExisting || selectedNewWardIds.includes(geoId);

                    return (
                      <label
                        key={ward.id}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1a1a1d] cursor-pointer border-b border-[#2a2a2e] last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleWardToggle(geoId)}
                          disabled={isExisting}
                          className="w-4 h-4 text-[#ca8a04] rounded focus:ring-[#ca8a04] bg-[#0d0d0f] border-[#2a2a2e] accent-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        <span className="text-sm text-white">
                          {ward.name}
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
                disabled={loading || selectedNewWardIds.length === 0}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Adding…' : `Add ${selectedNewWardIds.length || ''} Ward${selectedNewWardIds.length !== 1 ? 's' : ''}`}
              </button>
              <button
                type="button"
                onClick={() => navigate('/wards')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#ca8a04] bg-transparent text-[#ca8a04] font-semibold hover:bg-[#ca8a04]/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Add by Name Mode */}
        {mode === 'by-name' && (
          <form onSubmit={handleSubmitByName} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1">
                <label htmlFor="nameFormState" className="text-sm font-medium text-white">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="nameFormState"
                  value={nameFormStateId}
                  onChange={(e) => setNameFormStateId(e.target.value)}
                  disabled={loadingStates}
                  className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                >
                  <option value="">{loadingStates ? 'Loading...' : '-- Select State --'}</option>
                  {geoStates.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="nameFormLga" className="text-sm font-medium text-white">
                  LGA <span className="text-red-500">*</span>
                </label>
                <select
                  id="nameFormLga"
                  value={nameFormLgaId}
                  onChange={(e) => setNameFormLgaId(e.target.value)}
                  disabled={!nameFormStateId || loadingNameFormLgas}
                  className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent disabled:bg-[#1a1a1d] disabled:text-[#666]"
                >
                  <option value="">{loadingNameFormLgas ? 'Loading...' : '-- Select LGA --'}</option>
                  {nameFormLgas.map((lga) => (
                    <option key={lga.id} value={lga.id}>
                      {lga.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="wardName" className="block text-sm font-medium text-white mb-2">
                Ward Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="wardName"
                value={wardName}
                onChange={(e) => setWardName(e.target.value)}
                placeholder="Enter ward name"
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || !nameFormStateId || !nameFormLgaId || !wardName.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating…' : 'Create Ward'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/wards')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#ca8a04] bg-transparent text-[#ca8a04] font-semibold hover:bg-[#ca8a04]/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
