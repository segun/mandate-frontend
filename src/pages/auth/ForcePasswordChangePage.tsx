import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from '../../stores/toast.store';

const validatePassword = (password: string): string => {
  if (!password) return 'New password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (!/[0-9]/.test(password) && !/[^A-Za-z0-9]/.test(password)) return 'Password must contain a number or special character';
  return '';
};

export function ForcePasswordChangePage() {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?.id);
  const clearRequirePasswordChange = useAuthStore((state) => state.clearRequirePasswordChange);
  const logout = useAuthStore((state) => state.logout);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const normalizedCurrentPassword = currentPassword.trim();
    const normalizedNewPassword = newPassword.trim();

    const passwordError = validatePassword(normalizedNewPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (normalizedNewPassword !== confirmPassword.trim()) {
      setError('New password and confirmation do not match');
      return;
    }

    if (normalizedCurrentPassword === normalizedNewPassword) {
      setError('New password must be different from current password');
      return;
    }

    if (!userId) {
      setError('User session is invalid. Please login again.');
      return;
    }

    setSaving(true);
    try {
      await authService.changePassword(userId, {
        currentPassword: normalizedCurrentPassword,
        newPassword: normalizedNewPassword,
      });
      clearRequirePasswordChange();
      toast.success('Password changed successfully');
      navigate('/dashboard', { replace: true });
    } catch (err: unknown) {
      const errorResponse = err as { response?: { data?: { message?: string } } };
      setError(errorResponse.response?.data?.message || 'Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0f] px-4">
      <div className="w-full max-w-md bg-[#141417] px-6 sm:px-8 py-8 rounded-2xl shadow-2xl border border-[#2a2a2e]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#ca8a04]">Change Password</h1>
          <p className="text-sm text-[#888] mt-2">You must change your password before continuing.</p>
        </div>

        {error && (
          <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-[#1a1a1d] border border-[#2a2a2e] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#ca8a04] py-2.5 text-[#0d0d0f] font-semibold hover:bg-[#d4940a] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Updating...' : 'Update Password'}
          </button>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] py-2.5 text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
