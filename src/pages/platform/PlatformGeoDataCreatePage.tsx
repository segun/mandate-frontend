import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';
import { platformGeodataService, type GeodataItem, type GeoLevel } from '../../services/platform-geodata.service';
import { toast } from '../../stores/toast.store';

type CreateForm = {
  name: string;
  code: string;
  stateId: string;
  lgaId: string;
  wardId: string;
};

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

function parseLevel(value: string | null): GeoLevel {
  if (value === 'state' || value === 'lga' || value === 'ward' || value === 'polling-unit') {
    return value;
  }
  return 'state';
}

export function PlatformGeoDataCreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialLevel = parseLevel(searchParams.get('level'));
  const initialStateId = searchParams.get('stateId') || '';
  const initialLgaId = searchParams.get('lgaId') || '';
  const initialWardId = searchParams.get('wardId') || '';

  const [level, setLevel] = useState<GeoLevel>(initialLevel);
  const [form, setForm] = useState<CreateForm>({
    name: '',
    code: '',
    stateId: initialStateId,
    lgaId: initialLgaId,
    wardId: initialWardId,
  });
  const [creating, setCreating] = useState(false);

  const [states, setStates] = useState<GeodataItem[]>([]);
  const [lgas, setLgas] = useState<GeodataItem[]>([]);
  const [wards, setWards] = useState<GeodataItem[]>([]);

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingLgas, setLoadingLgas] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const showState = level === 'lga' || level === 'ward' || level === 'polling-unit';
  const showLga = level === 'ward' || level === 'polling-unit';
  const showWard = level === 'polling-unit';

  const loadStates = useCallback(async () => {
    setLoadingStates(true);
    try {
      const response = await platformGeodataService.list('state', { page: 1, limit: DEFAULT_PAGE_LIMIT });
      setStates(response.data);
    } catch {
      toast.error('Failed to load states');
      setStates([]);
    } finally {
      setLoadingStates(false);
    }
  }, []);

  const loadLgas = useCallback(async (stateId?: string) => {
    if (!stateId) {
      setLgas([]);
      return;
    }

    setLoadingLgas(true);
    try {
      const response = await platformGeodataService.list('lga', { page: 1, limit: DEFAULT_PAGE_LIMIT, stateId });
      setLgas(response.data);
    } catch {
      toast.error('Failed to load LGAs');
      setLgas([]);
    } finally {
      setLoadingLgas(false);
    }
  }, []);

  const loadWards = useCallback(async (stateId?: string, lgaId?: string) => {
    if (!lgaId) {
      setWards([]);
      return;
    }

    setLoadingWards(true);
    try {
      const response = await platformGeodataService.list('ward', { page: 1, limit: DEFAULT_PAGE_LIMIT, stateId, lgaId });
      setWards(response.data);
    } catch {
      toast.error('Failed to load wards');
      setWards([]);
    } finally {
      setLoadingWards(false);
    }
  }, []);

  useEffect(() => {
    if (showState) {
      loadStates();
    }
  }, [showState, loadStates]);

  useEffect(() => {
    if (showLga) {
      loadLgas(form.stateId || undefined);
    }
  }, [showLga, form.stateId, loadLgas]);

  useEffect(() => {
    if (showWard) {
      loadWards(form.stateId || undefined, form.lgaId || undefined);
    }
  }, [showWard, form.stateId, form.lgaId, loadWards]);

  useEffect(() => {
    if (!showLga && form.lgaId) {
      setForm((prev) => ({ ...prev, lgaId: '', wardId: '' }));
    }
    if (!showWard && form.wardId) {
      setForm((prev) => ({ ...prev, wardId: '' }));
    }
  }, [showLga, showWard, form.lgaId, form.wardId]);

  const pageTitle = useMemo(() => `Add New ${levelLabelMap[level]}`, [level]);

  const onLevelChange = (nextLevel: GeoLevel) => {
    setLevel(nextLevel);
    if (nextLevel === 'state') {
      setForm((prev) => ({ ...prev, stateId: '', lgaId: '', wardId: '', code: '' }));
      return;
    }

    if (nextLevel === 'lga') {
      setForm((prev) => ({ ...prev, lgaId: '', wardId: '', code: '' }));
      return;
    }

    if (nextLevel === 'ward') {
      setForm((prev) => ({ ...prev, wardId: '', code: '' }));
      return;
    }

    setForm((prev) => ({ ...prev }));
  };

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload: Record<string, string> = { name: form.name.trim() };
    if (!payload.name) {
      toast.error('Name is required');
      return;
    }

    if (level === 'lga') payload.stateId = form.stateId;
    if (level === 'ward') {
      payload.stateId = form.stateId;
      payload.lgaId = form.lgaId;
    }
    if (level === 'polling-unit') {
      payload.stateId = form.stateId;
      payload.lgaId = form.lgaId;
      payload.wardId = form.wardId;
      payload.code = form.code.trim();
    }

    const missingParent =
      (level === 'lga' && !payload.stateId) ||
      (level === 'ward' && (!payload.stateId || !payload.lgaId)) ||
      (level === 'polling-unit' && (!payload.stateId || !payload.lgaId || !payload.wardId || !payload.code));

    if (missingParent) {
      toast.error('Please complete all required fields for this level');
      return;
    }

    setCreating(true);
    try {
      await platformGeodataService.create(level, payload);
      toast.success(`${levelLabelMap[level]} created successfully`);
      navigate('/platform-owner/geodata');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        `Failed to create ${levelLabelMap[level].toLowerCase()}`;
      toast.error(message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">{pageTitle}</h1>
          <p className="text-sm text-[#888] mt-1">Create geodata and adjust parent selections before saving.</p>
        </div>
        <Link
          to="/platform-owner/geodata"
          className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
        >
          Back to Geo Data
        </Link>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="p-4 sm:p-6">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm text-[#ddd] mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => onLevelChange(e.target.value as GeoLevel)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              >
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#ddd] mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder={`Enter ${levelLabelMap[level].toLowerCase()} name`}
                className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
            </div>

            {showState && (
              <div>
                <label className="block text-sm text-[#ddd] mb-1">State</label>
                <select
                  value={form.stateId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      stateId: e.target.value,
                      lgaId: '',
                      wardId: '',
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
                >
                  <option value="">Select state</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {loadingStates && <p className="text-xs text-[#888] mt-1">Loading states...</p>}
              </div>
            )}

            {showLga && (
              <div>
                <label className="block text-sm text-[#ddd] mb-1">LGA</label>
                <select
                  value={form.lgaId}
                  onChange={(e) => setForm((prev) => ({ ...prev, lgaId: e.target.value, wardId: '' }))}
                  disabled={!form.stateId}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white disabled:opacity-60"
                >
                  <option value="">Select LGA</option>
                  {lgas.map((lga) => (
                    <option key={lga.id} value={lga.id}>
                      {lga.name}
                    </option>
                  ))}
                </select>
                {loadingLgas && <p className="text-xs text-[#888] mt-1">Loading LGAs...</p>}
              </div>
            )}

            {showWard && (
              <div>
                <label className="block text-sm text-[#ddd] mb-1">Ward</label>
                <select
                  value={form.wardId}
                  onChange={(e) => setForm((prev) => ({ ...prev, wardId: e.target.value }))}
                  disabled={!form.lgaId}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white disabled:opacity-60"
                >
                  <option value="">Select ward</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
                {loadingWards && <p className="text-xs text-[#888] mt-1">Loading wards...</p>}
              </div>
            )}

            {level === 'polling-unit' && (
              <div>
                <label className="block text-sm text-[#ddd] mb-1">Code</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
                  placeholder="Enter polling unit code"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
                />
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60"
              >
                {creating ? 'Creating...' : `Create ${levelLabelMap[level]}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
