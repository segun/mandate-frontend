/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { votersService } from '../../services/voters.service';
import { statesService } from '../../services/states.service';
import { lgasService } from '../../services/lgas.service';
import { wardsService } from '../../services/wards.service';
import { pollingUnitsService } from '../../services/polling-units.service';
import { usersService } from '../../services/users.service';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';
import { toast } from '../../stores/toast.store';
import { useAuthStore } from '../../stores/auth.store';
import { canManageVotersTenantWide } from '../../lib/permissions';

interface FormData {
  fullName: string;
  phone: string;
  houseAddress: string;
  pvcNumber: string;
  pvcStatus: string;
  supportLevel: string;
  engagementStatus: string;
  votingCommitment: string;
  notes: string;
  stateId: string;
  lgaId: string;
  wardId: string;
  pollingUnitId: string;
  assignedCanvasserId: string;
}

interface FormErrors {
  fullName: string;
  phone: string;
  stateId: string;
  lgaId: string;
  wardId: string;
  pollingUnitId: string;
  assignedCanvasserId: string;
}

interface TouchedFields {
  fullName: boolean;
  phone: boolean;
  stateId: boolean;
  lgaId: boolean;
  wardId: boolean;
  pollingUnitId: boolean;
  assignedCanvasserId: boolean;
}

interface SelectOption {
  id: string;
  name: string;
}

const supportLevels = [
  { value: 'STRONG_SUPPORTER', label: 'Strong Supporter' },
  { value: 'LEAN_SUPPORTER', label: 'Lean Supporter' },
  { value: 'UNDECIDED', label: 'Undecided' },
  { value: 'LEAN_OPPOSITION', label: 'Lean Opposition' },
  { value: 'STRONG_OPPOSITION', label: 'Strong Opposition' },
];

const pvcStatuses = [
  { value: 'YES', label: 'Yes' },
  { value: 'NO', label: 'No' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'LOST', label: 'Lost' },
];

const engagementStatuses = [
  { value: 'NOT_CONTACTED', label: 'Not Contacted' },
  { value: 'CONTACTED', label: 'Contacted' },
  { value: 'FOLLOW_UP', label: 'Follow Up' },
  { value: 'FOLLOW_UP_NEEDED', label: 'Follow Up Needed' },
  { value: 'COMMITTED', label: 'Committed' },
  { value: 'MOBILIZED', label: 'Mobilized' },
  { value: 'UNREACHABLE', label: 'Unreachable' },
];

const votingCommitments = [
  { value: 'WILL_VOTE', label: 'Will Vote' },
  { value: 'LIKELY_VOTE', label: 'Likely Vote' },
  { value: 'UNKNOWN', label: 'Unknown' },
  { value: 'UNLIKELY_VOTE', label: 'Unlikely Vote' },
  { value: 'WILL_NOT_VOTE', label: 'Will Not Vote' },
  { value: 'CONFIRMED', label: 'Confirmed' },
];

// Validation functions
const validateFullName = (name: string): string => {
  if (!name) return 'Full name is required';
  if (name.length < 2) return 'Full name must be at least 2 characters';
  return '';
};

const validatePhone = (phone: string): string => {
  if (!phone) return 'Phone number is required';
  if (!/^\d+$/.test(phone)) return 'Phone number must contain only digits';
  if (!phone.startsWith('0')) return 'Phone number must start with 0';
  if (phone.length < 10 || phone.length > 11) return 'Phone number must be 10-11 digits';
  return '';
};

const validateRequired = (value: string, fieldName: string): string => {
  if (!value) return `${fieldName} is required`;
  return '';
};

export default function CreateVoterPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const canManageTenantWide = canManageVotersTenantWide(user?.role);
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<SelectOption[]>([]);
  const [lgas, setLgas] = useState<SelectOption[]>([]);
  const [wards, setWards] = useState<SelectOption[]>([]);
  const [pollingUnits, setPollingUnits] = useState<SelectOption[]>([]);
  const [canvassers, setCanvassers] = useState<SelectOption[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    houseAddress: '',
    pvcNumber: '',
    pvcStatus: 'NO',
    supportLevel: 'UNDECIDED',
    engagementStatus: 'NOT_CONTACTED',
    votingCommitment: 'UNKNOWN',
    notes: '',
    stateId: '',
    lgaId: '',
    wardId: '',
    pollingUnitId: '',
    assignedCanvasserId: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: '',
    phone: '',
    stateId: '',
    lgaId: '',
    wardId: '',
    pollingUnitId: '',
    assignedCanvasserId: '',
  });

  const [touched, setTouched] = useState<TouchedFields>({
    fullName: false,
    phone: false,
    stateId: false,
    lgaId: false,
    wardId: false,
    pollingUnitId: false,
    assignedCanvasserId: false,
  });

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoadingOptions(true);
        const statesData = await statesService.getAll(1, DEFAULT_PAGE_LIMIT);
        setStates(statesData.data.data.map((s: any) => ({ id: s.id, name: s.geoState?.name || s.name || 'Unknown' })));
        
        if (canManageTenantWide) {
          try {
            const canvassersData = await usersService.getAll(1, DEFAULT_PAGE_LIMIT);
            setCanvassers(
              canvassersData.data
                .filter((u: any) => ['FIELD_OFFICER', 'UNIT_COMMANDER', 'WARD_OFFICER'].includes(u.role))
                .map((u: any) => ({ id: u.id, name: u.fullName }))
            );
          } catch (err) {
            // If API fails, fall back to current user
            console.warn('Could not load canvassers:', err);
            if (user) {
              setCanvassers([{ id: user.id, name: user.fullName }]);
            }
          }
        } else {
          if (user) {
            setCanvassers([{ id: user.id, name: user.fullName }]);
            setFormData((prev) => ({ ...prev, assignedCanvasserId: user.id }));
          }
        }
      } catch {
        toast.error('Failed to load options');
      } finally {
        setLoadingOptions(false);
      }
    };
    loadInitialData();
  }, [canManageTenantWide, user]);

  useEffect(() => {
    if (!canManageTenantWide && user?.id) {
      setFormData((prev) => ({ ...prev, assignedCanvasserId: user.id }));
    }
  }, [canManageTenantWide, user?.id]);

  // Load LGAs when state changes
  useEffect(() => {
    if (formData.stateId) {
      const loadLgas = async () => {
        try {
          const data = await lgasService.getAll(formData.stateId, 1, DEFAULT_PAGE_LIMIT);
          setLgas(data.data.data.map((l: any) => ({ id: l.id, name: l.geoLga?.name || l.name || 'Unknown' })));
          setWards([]);
          setPollingUnits([]);
          setFormData((prev) => ({
            ...prev,
            lgaId: '',
            wardId: '',
            pollingUnitId: '',
          }));
        } catch {
          toast.error('Failed to load LGAs');
        }
      };
      loadLgas();
    }
  }, [formData.stateId]);

  // Load wards when LGA changes
  useEffect(() => {
    if (formData.lgaId) {
      const loadWards = async () => {
        try {
          const data = await wardsService.getAll(1, DEFAULT_PAGE_LIMIT, formData.lgaId);
          setWards(data.data.map((w: any) => ({ id: w.id, name: w.geoWard?.name || w.name || 'Unknown' })));
          setPollingUnits([]);
          setFormData((prev) => ({
            ...prev,
            wardId: '',
            pollingUnitId: '',
          }));
        } catch {
          toast.error('Failed to load wards');
        }
      };
      loadWards();
    }
  }, [formData.lgaId]);

  // Load polling units when ward changes
  useEffect(() => {
    if (formData.wardId) {
      const loadPollingUnits = async () => {
        try {
          const data = await pollingUnitsService.getAll(1, DEFAULT_PAGE_LIMIT, formData.wardId);
          setPollingUnits(data.data.map((p: any) => ({ id: p.id, name: p.geoPollingUnit?.name })));
          setFormData((prev) => ({
            ...prev,
            pollingUnitId: '',
          }));
        } catch {
          toast.error('Failed to load polling units');
        }
      };
      loadPollingUnits();
    }
  }, [formData.wardId]);

  // Validate fields when they change
  useEffect(() => {
    if (touched.fullName) {
      setErrors((prev) => ({ ...prev, fullName: validateFullName(formData.fullName) }));
    }
  }, [formData.fullName, touched.fullName]);

  useEffect(() => {
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validatePhone(formData.phone) }));
    }
  }, [formData.phone, touched.phone]);

  useEffect(() => {
    if (touched.stateId) {
      setErrors((prev) => ({ ...prev, stateId: validateRequired(formData.stateId, 'State') }));
    }
  }, [formData.stateId, touched.stateId]);

  useEffect(() => {
    if (touched.lgaId) {
      setErrors((prev) => ({ ...prev, lgaId: validateRequired(formData.lgaId, 'LGA') }));
    }
  }, [formData.lgaId, touched.lgaId]);

  useEffect(() => {
    if (touched.wardId) {
      setErrors((prev) => ({ ...prev, wardId: validateRequired(formData.wardId, 'Ward') }));
    }
  }, [formData.wardId, touched.wardId]);

  useEffect(() => {
    if (touched.pollingUnitId) {
      setErrors((prev) => ({
        ...prev,
        pollingUnitId: validateRequired(formData.pollingUnitId, 'Polling Unit'),
      }));
    }
  }, [formData.pollingUnitId, touched.pollingUnitId]);

  useEffect(() => {
    if (touched.assignedCanvasserId) {
      setErrors((prev) => ({
        ...prev,
        assignedCanvasserId: validateRequired(formData.assignedCanvasserId, 'Assigned Canvasser'),
      }));
    }
  }, [formData.assignedCanvasserId, touched.assignedCanvasserId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      // If PVC status changes and is not YES, clear PVC number and keep it disabled
      if (name === 'pvcStatus') {
        if (value !== 'YES') {
          return { ...prev, pvcStatus: value, pvcNumber: '' };
        }
        return { ...prev, pvcStatus: value };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Touch all fields to show errors
    setTouched({
      fullName: true,
      phone: true,
      stateId: true,
      lgaId: true,
      wardId: true,
      pollingUnitId: true,
      assignedCanvasserId: true,
    });

    // Validate all fields
    const fullNameError = validateFullName(formData.fullName);
    const phoneError = validatePhone(formData.phone);
    const stateIdError = validateRequired(formData.stateId, 'State');
    const lgaIdError = validateRequired(formData.lgaId, 'LGA');
    const wardIdError = validateRequired(formData.wardId, 'Ward');
    const pollingUnitIdError = validateRequired(formData.pollingUnitId, 'Polling Unit');
    const assignedCanvasserIdError = validateRequired(formData.assignedCanvasserId, 'Assigned Canvasser');

    setErrors({
      fullName: fullNameError,
      phone: phoneError,
      stateId: stateIdError,
      lgaId: lgaIdError,
      wardId: wardIdError,
      pollingUnitId: pollingUnitIdError,
      assignedCanvasserId: assignedCanvasserIdError,
    });

    if (
      fullNameError ||
      phoneError ||
      stateIdError ||
      lgaIdError ||
      wardIdError ||
      pollingUnitIdError ||
      assignedCanvasserIdError
    ) {
      toast.error('Please fix the validation errors');
      return;
    }

    setLoading(true);
    try {
      await votersService.create({
        ...formData,
        assignedCanvasserId: canManageTenantWide ? formData.assignedCanvasserId : (user?.id || ''),
      });
      toast.success('Voter created successfully');
      navigate('/voters');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to create voter');
    } finally {
      setLoading(false);
    }
  };

  const getInputClassName = (field: keyof FormErrors) => {
    const baseClass = 'w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent';
    if (touched[field] && errors[field]) {
      return `${baseClass} border-red-500`;
    }
    if (touched[field] && !errors[field]) {
      return `${baseClass} border-green-500`;
    }
    return `${baseClass} border-[#2a2a2e]`;
  };

  if (loadingOptions) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-10 text-center text-[#888]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Add Voter</h1>
          <p className="text-sm text-[#888] mt-1">Register a new voter in the system</p>
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#ca8a04]/60 bg-[#1a1a1d] text-[#ca8a04] font-semibold hover:bg-[#2a2a2e] hover:border-[#ca8a04] transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="border-b border-[#2a2a2e] pb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('fullName')}
                  className={getInputClassName('fullName')}
                  placeholder="Enter full name"
                />
                {touched.fullName && errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  className={getInputClassName('phone')}
                  placeholder="e.g. 08089370313"
                />
                {touched.phone && errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* House Address */}
            <div className="mt-6">
              <label htmlFor="houseAddress" className="block text-sm font-medium text-gray-300 mb-2">
                House Address
              </label>
              <input
                type="text"
                id="houseAddress"
                name="houseAddress"
                value={formData.houseAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                placeholder="Enter house address"
              />
            </div>

            {/* Notes */}
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                placeholder="Enter any notes about the voter"
              />
            </div>
          </div>

          {/* Hierarchy */}
          <div className="border-b border-[#2a2a2e] pb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Hierarchy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* State */}
              <div>
                <label htmlFor="stateId" className="block text-sm font-medium text-gray-300 mb-2">
                  State *
                </label>
                <select
                  id="stateId"
                  name="stateId"
                  value={formData.stateId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('stateId')}
                  className={getInputClassName('stateId')}
                >
                  <option value="">Select state</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {touched.stateId && errors.stateId && (
                  <p className="mt-1 text-sm text-red-500">{errors.stateId}</p>
                )}
              </div>

              {/* LGA */}
              <div>
                <label htmlFor="lgaId" className="block text-sm font-medium text-gray-300 mb-2">
                  LGA *
                </label>
                <select
                  id="lgaId"
                  name="lgaId"
                  value={formData.lgaId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('lgaId')}
                  className={getInputClassName('lgaId')}
                  disabled={!formData.stateId}
                >
                  <option value="">Select LGA</option>
                  {lgas.map((lga) => (
                    <option key={lga.id} value={lga.id}>
                      {lga.name}
                    </option>
                  ))}
                </select>
                {touched.lgaId && errors.lgaId && (
                  <p className="mt-1 text-sm text-red-500">{errors.lgaId}</p>
                )}
              </div>

              {/* Ward */}
              <div>
                <label htmlFor="wardId" className="block text-sm font-medium text-gray-300 mb-2">
                  Ward *
                </label>
                <select
                  id="wardId"
                  name="wardId"
                  value={formData.wardId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('wardId')}
                  className={getInputClassName('wardId')}
                  disabled={!formData.lgaId}
                >
                  <option value="">Select ward</option>
                  {wards.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      {ward.name}
                    </option>
                  ))}
                </select>
                {touched.wardId && errors.wardId && (
                  <p className="mt-1 text-sm text-red-500">{errors.wardId}</p>
                )}
              </div>

              {/* Polling Unit */}
              <div>
                <label htmlFor="pollingUnitId" className="block text-sm font-medium text-gray-300 mb-2">
                  Polling Unit *
                </label>
                <select
                  id="pollingUnitId"
                  name="pollingUnitId"
                  value={formData.pollingUnitId}
                  onChange={handleChange}
                  onBlur={() => handleBlur('pollingUnitId')}
                  className={getInputClassName('pollingUnitId')}
                  disabled={!formData.wardId}
                >
                  <option value="">Select polling unit</option>
                  {pollingUnits.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                      {unit.name}
                    </option>
                  ))}
                </select>
                {touched.pollingUnitId && errors.pollingUnitId && (
                  <p className="mt-1 text-sm text-red-500">{errors.pollingUnitId}</p>
                )}
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="border-b border-[#2a2a2e] pb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Assignment</h3>
            <div>
              <label htmlFor="assignedCanvasserId" className="block text-sm font-medium text-gray-300 mb-2">
                Assigned Canvasser *
              </label>
              <select
                id="assignedCanvasserId"
                name="assignedCanvasserId"
                value={formData.assignedCanvasserId}
                onChange={handleChange}
                onBlur={() => handleBlur('assignedCanvasserId')}
                className={getInputClassName('assignedCanvasserId')}
                disabled={!canManageTenantWide}
              >
                <option value="">Select canvasser</option>
                {canvassers.map((canvasser) => (
                  <option key={canvasser.id} value={canvasser.id}>
                    {canvasser.name}
                  </option>
                ))}
              </select>
              {touched.assignedCanvasserId && errors.assignedCanvasserId && (
                <p className="mt-1 text-sm text-red-500">{errors.assignedCanvasserId}</p>
              )}
            </div>
          </div>

          {/* PVC & Support Information */}
          <div className="border-b border-[#2a2a2e] pb-6">
            <h3 className="text-lg font-semibold text-white mb-4">PVC & Support Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* PVC Status */}
              <div>
                <label htmlFor="pvcStatus" className="block text-sm font-medium text-gray-300 mb-2">
                  PVC Status
                </label>
                <select
                  id="pvcStatus"
                  name="pvcStatus"
                  value={formData.pvcStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                >
                  {pvcStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* PVC Number */}
              <div>
                <label htmlFor="pvcNumber" className="block text-sm font-medium text-gray-300 mb-2">
                  PVC Number
                </label>
                <input
                  type="text"
                  id="pvcNumber"
                  name="pvcNumber"
                  value={formData.pvcNumber}
                  onChange={handleChange}
                  disabled={formData.pvcStatus !== 'YES'}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
                  placeholder="Enter PVC number"
                />
              </div>

              {/* Support Level */}
              <div>
                <label htmlFor="supportLevel" className="block text-sm font-medium text-gray-300 mb-2">
                  Support Level
                </label>
                <select
                  id="supportLevel"
                  name="supportLevel"
                  value={formData.supportLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                >
                  {supportLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Engagement Status */}
              <div>
                <label htmlFor="engagementStatus" className="block text-sm font-medium text-gray-300 mb-2">
                  Engagement Status
                </label>
                <select
                  id="engagementStatus"
                  name="engagementStatus"
                  value={formData.engagementStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                >
                  {engagementStatuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Voting Commitment */}
              <div>
                <label htmlFor="votingCommitment" className="block text-sm font-medium text-gray-300 mb-2">
                  Voting Commitment
                </label>
                <select
                  id="votingCommitment"
                  name="votingCommitment"
                  value={formData.votingCommitment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                >
                  {votingCommitments.map((commitment) => (
                    <option key={commitment.value} value={commitment.value}>
                      {commitment.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Voter'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/voters')}
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
