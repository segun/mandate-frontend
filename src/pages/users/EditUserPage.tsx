import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usersService, type User } from '../../services/users.service';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from '../../stores/toast.store';
import { UserRole, isSuperAdmin } from '../../lib/permissions';

interface FormData {
  fullName: string;
  phone: string;
  role: string;
  newPassword: string;
  requirePasswordChange: boolean;
}

interface FormErrors {
  fullName: string;
  phone: string;
  newPassword: string;
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

const validateFullName = (name: string): string => {
  if (!name) return 'Full name is required';
  if (name.length < 3) return 'Full name must be at least 3 characters';
  return '';
};

const validatePhone = (phone: string): string => {
  if (!phone) return 'Phone number is required';
  if (!/^\d+$/.test(phone)) return 'Phone number must contain only digits';
  if (!phone.startsWith('0')) return 'Phone number must start with 0';
  if (phone.length < 10 || phone.length > 11) return 'Phone number must be 10-11 digits';
  return '';
};

const validatePassword = (password: string): string => {
  if (!password) return '';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (!/[0-9]/.test(password) && !/[^A-Za-z0-9]/.test(password)) return 'Password must contain a number or special character';
  return '';
};

const generatePassword = (): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*';

  let password = '';
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  const allChars = uppercase + lowercase + numbers + special;
  for (let i = 0; i < 4; i += 1) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password.split('').sort(() => Math.random() - 0.5).join('');
};

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const currentUser = useAuthStore((state) => state.user);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    role: 'FIELD_OFFICER',
    newPassword: '',
    requirePasswordChange: true,
  });

  const [errors, setErrors] = useState<FormErrors>({
    fullName: '',
    phone: '',
    newPassword: '',
  });

  const canEditUsers = useMemo(() => isSuperAdmin(currentUser?.role), [currentUser?.role]);
  const isPlatformOwner = currentUser?.role === UserRole.PLATFORM_OWNER;

  useEffect(() => {
    const loadUser = async () => {
      if (!id) {
        toast.error('User ID is required');
        navigate('/users');
        return;
      }

      if (!canEditUsers || isPlatformOwner) {
        toast.error('Only super admins can edit users');
        navigate(`/users/${id}`);
        return;
      }

      if (currentUser?.id === id) {
        toast.error('You cannot edit your own user via this page');
        navigate(`/users/${id}`);
        return;
      }

      try {
        setLoading(true);
        const response = await usersService.getById(id);
        setUser(response);
        setFormData({
          fullName: response.fullName || '',
          phone: response.phone || '',
          role: response.role || 'FIELD_OFFICER',
          newPassword: '',
          requirePasswordChange: true,
        });
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || 'Failed to load user');
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, canEditUsers, isPlatformOwner, currentUser?.id, navigate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleGeneratePassword = () => {
    setFormData((prev) => ({ ...prev, newPassword: generatePassword() }));
    setErrors((prev) => ({ ...prev, newPassword: '' }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!id) return;

    const fullNameError = validateFullName(formData.fullName);
    const phoneError = validatePhone(formData.phone);
    const newPasswordError = validatePassword(formData.newPassword);

    setErrors({ fullName: fullNameError, phone: phoneError, newPassword: newPasswordError });

    if (fullNameError || phoneError || newPasswordError) {
      toast.error('Please fix the validation errors');
      return;
    }

    setSaving(true);
    try {
      await usersService.update(id, {
        fullName: formData.fullName,
        phone: formData.phone,
        role: formData.role,
      });

      if (formData.newPassword) {
        await usersService.resetPassword(id, {
          newPassword: formData.newPassword,
          requirePasswordChange: formData.requirePasswordChange,
        });
      }

      toast.success(formData.newPassword ? 'User updated and password reset successfully' : 'User updated successfully');
      navigate(`/users/${id}`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-10 text-center text-[#888]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="p-10 text-center text-red-400">User not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Edit User</h1>
          <p className="text-sm text-[#888] mt-1">Update user details</p>
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              placeholder="Enter full name"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email (read-only)
            </label>
            <input
              id="email"
              value={user.email}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-[#888]"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              placeholder="e.g. 08089370313"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
              New Password (optional)
            </label>
            <div className="flex gap-3">
              <input
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="flex-1 px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
                placeholder="Enter new temporary password"
              />
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="px-4 py-3 bg-[#2a2a2e] text-white rounded-lg hover:bg-[#3a3a3e] transition-colors whitespace-nowrap"
              >
                Generate Password
              </button>
            </div>
            {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
            <p className="mt-1 text-xs text-gray-500">
              Leave blank to keep existing password.
            </p>
          </div>

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
              Require password change on next login
            </label>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/users/${id}`)}
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