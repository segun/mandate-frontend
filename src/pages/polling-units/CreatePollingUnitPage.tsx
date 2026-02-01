import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pollingUnitsService } from '../../services/polling-units.service';
import { geodataService } from '../../services/geodata.service';
import type { GeoState, GeoLga, GeoWard, GeoPollingUnit } from '../../services/geodata.service';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';
import { toast } from '../../stores/toast.store';

export function CreatePollingUnitPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'geo-id' | 'by-name'>('geo-id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Geo ID mode state
  const [geoStates, setGeoStates] = useState<GeoState[]>([]);
  const [geoLgas, setGeoLgas] = useState<GeoLga[]>([]);
  const [geoWards, setGeoWards] = useState<GeoWard[]>([]);
  const [geoPollingUnits, setGeoPollingUnits] = useState<GeoPollingUnit[]>([]);
  const [selectedStateId, setSelectedStateId] = useState<string>('');
  const [selectedLgaId, setSelectedLgaId] = useState<string>('');
  const [selectedWardId, setSelectedWardId] = useState<string>('');
  const [existingGeoPollingUnitIds, setExistingGeoPollingUnitIds] = useState<string[]>([]);
  const [selectedNewPollingUnitIds, setSelectedNewPollingUnitIds] = useState<string[]>([]);

  // By Name mode state
  const [nameFormStateId, setNameFormStateId] = useState<string>('');
  const [nameFormLgaId, setNameFormLgaId] = useState<string>('');
  const [nameFormWardId, setNameFormWardId] = useState<string>('');
  const [nameFormLgas, setNameFormLgas] = useState<GeoLga[]>([]);
  const [nameFormWards, setNameFormWards] = useState<GeoWard[]>([]);
  const [puName, setPuName] = useState('');
  const [puCode, setPuCode] = useState('');
  const [puAddress, setPuAddress] = useState('');
  const [puDescription, setPuDescription] = useState('');

  // Loading states
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [loadingPollingUnits, setLoadingPollingUnits] = useState(false);
  const [loadingNameFormLgas, setLoadingNameFormLgas] = useState(false);
  const [loadingNameFormWards, setLoadingNameFormWards] = useState(false);

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

  // Fetch tenant polling units once to know which reference polling units are already present
  useEffect(() => {
    const fetchExistingPollingUnits = async () => {
      try {
        const pageSize = DEFAULT_PAGE_LIMIT;
        let page = 1;
        let collected: string[] = [];
        let hasMore = true;

        while (hasMore) {
          const response = await pollingUnitsService.getAll(page, pageSize);
          // Collect geoPollingUnitIds of already added polling units
          const geoIds = response.data
            .filter((pu) => pu.geoPollingUnitId)
            .map((pu) => String(pu.geoPollingUnitId));
          collected = collected.concat(geoIds);

          const total = response.meta?.total ?? Number.POSITIVE_INFINITY;
          hasMore = response.data.length === pageSize && collected.length < total;
          page += 1;
        }

        setExistingGeoPollingUnitIds(collected);
      } catch {
        setError('Failed to load existing polling units');
      }
    };

    fetchExistingPollingUnits();
  }, []);

  // Fetch LGAs when state changes
  useEffect(() => {
    if (!selectedStateId) {
      setGeoLgas([]);
      setGeoWards([]);
      setGeoPollingUnits([]);
      setSelectedLgaId('');
      setSelectedWardId('');
      setSelectedNewPollingUnitIds([]);
      return;
    }

    const fetchLgas = async () => {
      setLoadingLgas(true);
      try {
        const response = await geodataService.getLgasByState(selectedStateId, 1, DEFAULT_PAGE_LIMIT);
        setGeoLgas(response.data);
        setSelectedLgaId('');
        setGeoWards([]);
        setGeoPollingUnits([]);
        setSelectedWardId('');
        setSelectedNewPollingUnitIds([]);
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
      setGeoPollingUnits([]);
      setSelectedWardId('');
      setSelectedNewPollingUnitIds([]);
      return;
    }

    const fetchWards = async () => {
      setLoadingWards(true);
      try {
        const response = await geodataService.getWardsByLga(selectedLgaId, 1, DEFAULT_PAGE_LIMIT);
        setGeoWards(response.data);
        setSelectedWardId('');
        setGeoPollingUnits([]);
        setSelectedNewPollingUnitIds([]);
      } catch {
        setError('Failed to load wards');
      } finally {
        setLoadingWards(false);
      }
    };
    fetchWards();
  }, [selectedLgaId]);

  // Fetch polling units when ward changes
  useEffect(() => {
    if (!selectedWardId) {
      setGeoPollingUnits([]);
      setSelectedNewPollingUnitIds([]);
      return;
    }

    const fetchPollingUnits = async () => {
      setLoadingPollingUnits(true);
      try {
        const response = await geodataService.getPollingUnitsByWard(selectedWardId, 1, DEFAULT_PAGE_LIMIT);
        setGeoPollingUnits(response.data);
        setSelectedNewPollingUnitIds([]);
      } catch {
        setError('Failed to load polling units');
      } finally {
        setLoadingPollingUnits(false);
      }
    };
    fetchPollingUnits();
  }, [selectedWardId]);

  // By-name mode: Fetch LGAs when state changes
  useEffect(() => {
    if (!nameFormStateId) {
      setNameFormLgas([]);
      setNameFormWards([]);
      setNameFormLgaId('');
      setNameFormWardId('');
      return;
    }

    const fetchLgas = async () => {
      setLoadingNameFormLgas(true);
      try {
        const response = await geodataService.getLgasByState(nameFormStateId, 1, DEFAULT_PAGE_LIMIT);
        setNameFormLgas(response.data);
        setNameFormLgaId('');
        setNameFormWards([]);
        setNameFormWardId('');
      } catch {
        setError('Failed to load LGAs');
      } finally {
        setLoadingNameFormLgas(false);
      }
    };
    fetchLgas();
  }, [nameFormStateId]);

  // By-name mode: Fetch wards when LGA changes
  useEffect(() => {
    if (!nameFormLgaId) {
      setNameFormWards([]);
      setNameFormWardId('');
      return;
    }

    const fetchWards = async () => {
      setLoadingNameFormWards(true);
      try {
        const response = await geodataService.getWardsByLga(nameFormLgaId, 1, DEFAULT_PAGE_LIMIT);
        setNameFormWards(response.data);
        setNameFormWardId('');
      } catch {
        setError('Failed to load wards');
      } finally {
        setLoadingNameFormWards(false);
      }
    };
    fetchWards();
  }, [nameFormLgaId]);

  const handlePollingUnitToggle = (pollingUnitId: string) => {
    setSelectedNewPollingUnitIds((prev) =>
      prev.includes(pollingUnitId) ? prev.filter((id) => id !== pollingUnitId) : [...prev, pollingUnitId]
    );
  };

  const handleSelectAll = () => {
    const selectableIds = geoPollingUnits
      .filter((pu) => !existingGeoPollingUnitIds.includes(String(pu.id)))
      .map((pu) => String(pu.id));
    const allSelectableChosen =
      selectableIds.length > 0 && selectableIds.every((id) => selectedNewPollingUnitIds.includes(id));

    setSelectedNewPollingUnitIds(allSelectableChosen ? [] : selectableIds);
  };

  const handleSubmitGeoId = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (selectedNewPollingUnitIds.length === 0) {
      setError('Please select at least one new polling unit to add');
      return;
    }

    const selectedCount = selectedNewPollingUnitIds.length;
    toast.info(`Adding ${selectedCount} polling unit(s)... This may take a moment.`, 0);

    setLoading(true);
    try {
      const result = await pollingUnitsService.addPollingUnits(selectedNewPollingUnitIds);
      const addedCount = result.added?.length || 0;
      const skippedCount = result.skipped?.length || 0;

      if (addedCount > 0) {
        const message = `Successfully added ${addedCount} polling unit(s)${skippedCount > 0 ? `. ${skippedCount} already existed.` : ''}`;
        setSuccess(message);
        toast.success(message);
        setSelectedNewPollingUnitIds([]);
        setTimeout(() => navigate('/polling-units'), 1200);
      } else if (skippedCount > 0) {
        const message = `All ${skippedCount} selected polling unit(s) already exist in your tenant.`;
        setError(message);
        toast.warning(message);
      } else {
        setSuccess('Polling units added successfully');
        toast.success('Polling units added successfully');
        setTimeout(() => navigate('/polling-units'), 1000);
      }
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to add polling units';
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

    if (!nameFormWardId) {
      setError('Please select a ward');
      return;
    }

    if (!puName.trim()) {
      setError('Please enter a polling unit name');
      return;
    }

    if (!puCode.trim()) {
      setError('Please enter a polling unit code');
      return;
    }

    toast.info('Creating polling unit... This may take a moment.', 0);
    setLoading(true);
    try {
      const result = await pollingUnitsService.createPollingUnitByName({
        name: puName,
        code: puCode,
        geoStateId: nameFormStateId,
        geoLgaId: nameFormLgaId,
        geoWardId: nameFormWardId,
        address: puAddress || undefined,
        description: puDescription || undefined,
      });
      toast.success('Polling unit created successfully! Redirecting...');
      setPuName('');
      setPuCode('');
      setPuAddress('');
      setPuDescription('');
      setNameFormStateId('');
      setNameFormLgaId('');
      setNameFormWardId('');
      setTimeout(() => navigate('/polling-units'), 1000);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create polling unit';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Add Polling Units</h1>
          <p className="text-sm text-[#888] mt-1">Add polling units to your tenant</p>
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
            Add by Geo ID
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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

              {/* Ward Selection */}
              <div className="space-y-1">
                <label htmlFor="ward" className="text-sm font-medium text-white">
                  Select Ward
                </label>
                <select
                  id="ward"
                  value={selectedWardId}
                  onChange={(e) => setSelectedWardId(e.target.value)}
                  disabled={!selectedLgaId || loadingWards}
                  className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent disabled:bg-[#1a1a1d] disabled:text-[#666]"
                >
                  <option value="">{loadingWards ? 'Loading...' : '-- Select Ward --'}</option>
                  {geoWards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Polling Unit Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white">
                  Select Polling Units {selectedNewPollingUnitIds.length > 0 && `(${selectedNewPollingUnitIds.length} new selected)`}
                </label>
                {geoPollingUnits.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    disabled={geoPollingUnits.every((pu) => existingGeoPollingUnitIds.includes(String(pu.id)))}
                    className="text-sm text-[#ca8a04] hover:text-[#d4940a] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {geoPollingUnits
                      .filter((pu) => !existingGeoPollingUnitIds.includes(String(pu.id)))
                      .every((pu) => selectedNewPollingUnitIds.includes(String(pu.id)))
                      ? 'Deselect All New'
                      : 'Select All New'}
                  </button>
                )}
              </div>

              {loadingPollingUnits ? (
                <div className="p-4 text-center text-[#888]">Loading polling units...</div>
              ) : !selectedWardId ? (
                <div className="p-4 text-center text-[#888] border border-dashed border-[#2a2a2e] rounded-lg">
                  Select a state, LGA, and ward to view available polling units
                </div>
              ) : geoPollingUnits.length === 0 ? (
                <div className="p-4 text-center text-[#888] border border-dashed border-[#2a2a2e] rounded-lg">
                  No polling units found for the selected ward
                </div>
              ) : (
                <div className="border border-[#2a2a2e] rounded-lg max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 text-sm text-[#888] border-b border-[#2a2a2e] bg-[#0f0f12]">
                    {(() => {
                      const total = geoPollingUnits.length;
                      const available = geoPollingUnits.filter((pu) => !existingGeoPollingUnitIds.includes(String(pu.id))).length;
                      if (total === 0) return null;
                      if (available === 0) return `${total} reference polling unit(s); all already added`;
                      return `${available} new available (${total} total)`;
                    })()}
                  </div>
                  {geoPollingUnits.map((pu) => {
                    const geoId = String(pu.id);
                    const isExisting = existingGeoPollingUnitIds.includes(geoId);
                    const isChecked = isExisting || selectedNewPollingUnitIds.includes(geoId);

                    return (
                      <label
                        key={pu.id}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#1a1a1d] cursor-pointer border-b border-[#2a2a2e] last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handlePollingUnitToggle(geoId)}
                          disabled={isExisting}
                          className="w-4 h-4 text-[#ca8a04] rounded focus:ring-[#ca8a04] bg-[#0d0d0f] border-[#2a2a2e] accent-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed"
                        />
                        <div className="flex-1">
                          <span className="text-sm text-white">
                            {pu.name}
                            {isExisting && (
                              <span className="ml-2 text-xs text-[#888]">(Already added)</span>
                            )}
                          </span>
                          <p className="text-xs text-[#888] mt-0.5">Code: {pu.code}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || selectedNewPollingUnitIds.length === 0}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Adding…' : `Add ${selectedNewPollingUnitIds.length || ''} Polling Unit${selectedNewPollingUnitIds.length !== 1 ? 's' : ''}`}
              </button>
              <button
                type="button"
                onClick={() => navigate('/polling-units')}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
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

              <div className="space-y-1">
                <label htmlFor="nameFormWard" className="text-sm font-medium text-white">
                  Ward <span className="text-red-500">*</span>
                </label>
                <select
                  id="nameFormWard"
                  value={nameFormWardId}
                  onChange={(e) => setNameFormWardId(e.target.value)}
                  disabled={!nameFormLgaId || loadingNameFormWards}
                  className="w-full rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent disabled:bg-[#1a1a1d] disabled:text-[#666]"
                >
                  <option value="">{loadingNameFormWards ? 'Loading...' : '-- Select Ward --'}</option>
                  {nameFormWards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="puName" className="block text-sm font-medium text-white mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="puName"
                  value={puName}
                  onChange={(e) => setPuName(e.target.value)}
                  placeholder="Enter polling unit name"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="puCode" className="block text-sm font-medium text-white mb-2">
                  Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="puCode"
                  value={puCode}
                  onChange={(e) => setPuCode(e.target.value)}
                  placeholder="Enter polling unit code"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="puAddress" className="block text-sm font-medium text-white mb-2">
                Address <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                id="puAddress"
                value={puAddress}
                onChange={(e) => setPuAddress(e.target.value)}
                placeholder="Enter address"
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="puDescription" className="block text-sm font-medium text-white mb-2">
                Description <span className="text-gray-500 text-xs">(optional)</span>
              </label>
              <textarea
                id="puDescription"
                value={puDescription}
                onChange={(e) => setPuDescription(e.target.value)}
                placeholder="Enter description"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={loading || !nameFormStateId || !nameFormLgaId || !nameFormWardId || !puName.trim() || !puCode.trim()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating…' : 'Create Polling Unit'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/polling-units')}
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
