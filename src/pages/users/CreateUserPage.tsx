import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersService } from '../../services/users.service';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from '../../stores/toast.store';
import { UserRole } from '../../lib/permissions';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  parentOfficerId: string;
  requirePasswordChange: boolean;
}

interface FormErrors {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

interface TouchedFields {
  fullName: boolean;
  email: boolean;
  password: boolean;
  phone: boolean;
}

const roles = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'CAMPAIGN_DIRECTOR', label: 'Campaign Director' },
  { value: 'DATA_CONTROLLER', label: 'Data Controller' },
  { value: 'STATE_COORDINATOR', label: 'State Coordinator' },
  { value: 'LGA_COORDINATOR', label: 'LGA Coordinator' },
  { value: 'WARD_COMMANDER', label: 'Ward Commander' },
  { value: 'WARD_OFFICER', label: 'Ward Officer' },
  { value: 'UNIT_COMMANDER', label: 'Unit Commander' },
  { value: 'FIELD_OFFICER', label: 'Field Officer' },
];

const CREATOR_ROLE_TO_ALLOWED_TARGET_ROLES: Record<string, string[]> = {
  [UserRole.SUPER_ADMIN]: roles.map((role) => role.value),
  [UserRole.CAMPAIGN_DIRECTOR]: roles.map((role) => role.value),
  [UserRole.DATA_CONTROLLER]: roles.map((role) => role.value),
  [UserRole.STATE_COORDINATOR]: ['LGA_COORDINATOR', 'WARD_OFFICER', 'WARD_COMMANDER', 'UNIT_COMMANDER', 'FIELD_OFFICER'],
  [UserRole.LGA_COORDINATOR]: ['WARD_OFFICER', 'WARD_COMMANDER', 'UNIT_COMMANDER', 'FIELD_OFFICER'],
  [UserRole.WARD_COMMANDER]: ['UNIT_COMMANDER', 'FIELD_OFFICER'],
};

// Role hierarchy - lower index = higher level
const roleHierarchy: Record<string, number> = {
  'SUPER_ADMIN': 0,
  'CAMPAIGN_DIRECTOR': 1,
  'DATA_CONTROLLER': 1,
  'PLATFORM_ADMIN': 1,
  'STATE_COORDINATOR': 2,
  'LGA_COORDINATOR': 3,
  'WARD_COMMANDER': 4,
  'WARD_OFFICER': 4,
  'UNIT_COMMANDER': 5,
  'FIELD_OFFICER': 6,
};

// Get role level (higher number = lower in hierarchy)
const getRoleLevel = (role: string): number => roleHierarchy[role] ?? 999;

// Filter users to show only those at higher levels
const filterParentOfficers = (users: Array<{ id: string; fullName: string; role: string }>, selectedRole: string): Array<{ id: string; fullName: string; role: string }> => {
  const selectedRoleLevel = getRoleLevel(selectedRole);
  return users.filter(user => getRoleLevel(user.role) < selectedRoleLevel);
};

// Validation functions
const validateFullName = (name: string): string => {
  if (!name) return 'Full name is required';
  if (name.length < 3) return 'Full name must be at least 3 characters';
  return '';
};

const validateEmail = (email: string): string => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

const validatePassword = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  if (!/[!@#$%^&*]/.test(password)) return 'Password must contain a special character';
  return '';
};

const validatePhone = (phone: string): string => {
  if (!phone) return 'Phone number is required';
  if (!/^\d+$/.test(phone)) return 'Phone number must contain only digits';
  if (!phone.startsWith('0')) return 'Phone number must start with 0';
  if (phone.length < 10 || phone.length > 11) return 'Phone number must be 10-11 digits';
  return '';
};

// Generate random password
const generatePassword = (): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*';
  
  // Ensure at least one of each required type
  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  // Fill remaining 4 characters randomly
  const allChars = uppercase + lowercase + numbers + special;
  for (let i = 0; i < 4; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

export default function CreateUserPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const allowedTargetRoles = useMemo(
    () => CREATOR_ROLE_TO_ALLOWED_TARGET_ROLES[user?.role || ''] || [],
    [user?.role],
  );
  const availableRoles = useMemo(
    () => roles.filter((role) => allowedTargetRoles.includes(role.value)),
    [allowedTargetRoles],
  );
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'FIELD_OFFICER',
    parentOfficerId: '',
    requirePasswordChange: false,
  });

  const [allOfficers, setAllOfficers] = useState<Array<{ id: string; fullName: string; role: string }>>([]);
  const [loadingOfficers, setLoadingOfficers] = useState(true);

  const [errors, setErrors] = useState<FormErrors>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });

  const [touched, setTouched] = useState<TouchedFields>({
    fullName: false,
    email: false,
    password: false,
    phone: false,
  });

  // Load parent officers on mount
  useEffect(() => {
    const loadOfficers = async () => {
      try {
        setLoadingOfficers(true);
        const officers = await usersService.getMinimal();
        setAllOfficers(officers);
      } catch (error) {
        console.error('Failed to load officers:', error);
        toast.error('Failed to load available officers');
      } finally {
        setLoadingOfficers(false);
      }
    };

    loadOfficers();
  }, []);

  useEffect(() => {
    if (availableRoles.length === 0) {
      return;
    }

    if (!allowedTargetRoles.includes(formData.role)) {
      setFormData((prev) => ({
        ...prev,
        role: availableRoles[0].value,
        parentOfficerId: '',
      }));
    }
  }, [allowedTargetRoles, availableRoles, formData.role]);

  // Validate fields when they change
  useEffect(() => {
    if (touched.fullName) {
      setErrors(prev => ({ ...prev, fullName: validateFullName(formData.fullName) }));
    }
  }, [formData.fullName, touched.fullName]);

  useEffect(() => {
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(formData.email) }));
    }
  }, [formData.email, touched.email]);

  useEffect(() => {
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(formData.password) }));
    }
  }, [formData.password, touched.password]);

  useEffect(() => {
    if (touched.phone) {
      setErrors(prev => ({ ...prev, phone: validatePhone(formData.phone) }));
    }
  }, [formData.phone, touched.phone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      // Reset parent officer when role changes
      if (name === 'role') {
        updated.parentOfficerId = '';
      }
      return updated;
    });
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setFormData(prev => ({ ...prev, password: newPassword }));
    setTouched(prev => ({ ...prev, password: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!allowedTargetRoles.includes(formData.role)) {
      toast.error('You do not have permission to create this user role');
      return;
    }
    
    // Touch all fields to show errors
    setTouched({
      fullName: true,
      email: true,
      password: true,
      phone: true,
    });

    // Validate all fields
    const fullNameError = validateFullName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const phoneError = validatePhone(formData.phone);

    setErrors({
      fullName: fullNameError,
      email: emailError,
      password: passwordError,
      phone: phoneError,
    });

    if (fullNameError || emailError || passwordError || phoneError) {
      toast.error('Please fix the validation errors');
      return;
    }

    setLoading(true);
    try {
      await usersService.create({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        tenantId: user?.tenantId || '',
        requirePasswordChange: formData.requirePasswordChange === true,
        ...(formData.parentOfficerId && { parentOfficerId: formData.parentOfficerId }),
      });
      toast.success('User created successfully');
      navigate('/users');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to create user');
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Create User</h1>
          <p className="text-sm text-[#888] mt-1">Add a new user to the system</p>
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
        {availableRoles.length === 0 && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            You do not have permission to create users.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
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

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              className={getInputClassName('email')}
              placeholder="Enter email address"
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                className={`flex-1 px-4 py-3 rounded-lg bg-[#1a1a1d] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent ${
                  touched.password && errors.password ? 'border-red-500' : touched.password && !errors.password ? 'border-green-500' : 'border-[#2a2a2e]'
                }`}
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="px-4 py-3 bg-[#2a2a2e] text-white rounded-lg hover:bg-[#3a3a3e] transition-colors whitespace-nowrap"
              >
                Generate Password
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Must be 8+ chars with uppercase, lowercase, number, and special character
            </p>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
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

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={availableRoles.length === 0}
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
            >
              {availableRoles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* Parent Officer */}
          {formData.role !== 'SUPER_ADMIN' && (
            <div>
              <label htmlFor="parentOfficerId" className="block text-sm font-medium text-gray-300 mb-2">
                Parent Officer (Optional)
              </label>
              {loadingOfficers ? (
                <div className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-gray-400">
                  Loading officers...
                </div>
              ) : (
                <select
                  id="parentOfficerId"
                  name="parentOfficerId"
                  value={formData.parentOfficerId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                >
                  <option key="empty" value="">Select a parent officer...</option>
                  {filterParentOfficers(allOfficers, formData.role).map((officer) => (
                    <option key={officer.id} value={officer.id}>
                      {officer.fullName} ({roles.find(r => r.value === officer.role)?.label || officer.role})
                    </option>
                  ))}
                </select>
              )}
              {filterParentOfficers(allOfficers, formData.role).length === 0 && !loadingOfficers && (
                <p className="mt-1 text-sm text-gray-500">No eligible parent officers available for this role</p>
              )}
            </div>
          )}

          {/* Require Password Change */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="requirePasswordChange"
              name="requirePasswordChange"
              checked={formData.requirePasswordChange}
              onChange={handleChange}
              className="w-5 h-5 rounded bg-[#1a1a1d] border-[#2a2a2e] text-[#ca8a04] focus:ring-[#ca8a04] focus:ring-offset-0"
            />
            <label htmlFor="requirePasswordChange" className="text-sm text-gray-300">
              Require password change on first login
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading || availableRoles.length === 0}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/users')}
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
