import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usersService, type User } from '../../services/users.service';
import { toast } from '../../stores/toast.store';
import { useAuthStore } from '../../stores/auth.store';
import { hasAccessToResource, Resource } from '../../lib/permissions';

export default function ViewUserPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuthStore();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<'deactivate' | 'reactivate' | 'reset' | null>(null);
  const [tempPassword, setTempPassword] = useState('');
  const [requirePasswordChange, setRequirePasswordChange] = useState(true);

  const canViewUser = useMemo(
    () => hasAccessToResource(currentUser?.role, Resource.USERS),
    [currentUser?.role]
  );
  const canManageOtherUsers = useMemo(() => currentUser?.role === 'SUPER_ADMIN', [currentUser?.role]);
  const isOwnProfile = useMemo(() => user?.id === currentUser?.id, [user?.id, currentUser?.id]);

  useEffect(() => {
    const loadUser = async () => {
      if (!canViewUser) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        if (!id) throw new Error('User ID is required');
        const data = await usersService.getById(id);
        setUser(data);
      } catch {
        toast.error('Failed to load user');
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [canViewUser, id, navigate]);

  const formatRole = (role: string): string =>
    role
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');

  const getErrorMessage = (error: unknown, fallback: string): string => {
    const err = error as { response?: { data?: { message?: string } } };
    return err.response?.data?.message || fallback;
  };

  const validateAdminPassword = (password: string): string => {
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must include a lowercase letter';
    if (!/[0-9]|[^A-Za-z0-9]/.test(password)) return 'Password must include a number or special character';
    return '';
  };

  const handleDeactivate = async () => {
    if (!user || isOwnProfile) return;
    setActionLoading('deactivate');
    try {
      await usersService.deactivate(user.id);
      setUser((prev) => (prev ? { ...prev, isActive: false } : prev));
      toast.success('User deactivated successfully');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to deactivate user'));
    } finally {
      setActionLoading(null);
    }
  };

  const handleReactivate = async () => {
    if (!user || isOwnProfile) return;
    setActionLoading('reactivate');
    try {
      await usersService.reactivate(user.id);
      setUser((prev) => (prev ? { ...prev, isActive: true } : prev));
      toast.success('User reactivated successfully');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to reactivate user'));
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetPassword = async () => {
    if (!user || isOwnProfile) return;
    const passwordError = validateAdminPassword(tempPassword);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setActionLoading('reset');
    try {
      await usersService.resetPassword(user.id, {
        newPassword: tempPassword,
        requirePasswordChange,
      });
      setTempPassword('');
      setRequirePasswordChange(true);
      toast.success('Password reset successfully');
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to reset password'));
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-[#2a2a2e] rounded-lg w-1/3" />
          <div className="space-y-3">
            <div className="h-6 bg-[#2a2a2e] rounded w-full" />
            <div className="h-6 bg-[#2a2a2e] rounded w-5/6" />
            <div className="h-6 bg-[#2a2a2e] rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!canViewUser) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
          <p className="text-red-400 font-semibold">You do not have access to view user details.</p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-red-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">{user.fullName}</h1>
          <p className="text-sm text-[#888] mt-1">User Details</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {canManageOtherUsers && (
            <button
              type="button"
              onClick={() => {
                if (isOwnProfile) {
                  toast.info('You can only edit other users');
                  return;
                }
                navigate(`/users/${user.id}/edit`);
              }}
              disabled={isOwnProfile}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isOwnProfile ? 'Edit (other users only)' : 'Edit'}
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {!user.isActive && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-300 font-semibold">This user has been deactivated</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-lg text-white font-semibold mt-2">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg text-white font-semibold mt-2">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-lg text-white font-semibold mt-2">{user.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Role</p>
                <p className="text-lg text-white font-semibold mt-2">{formatRole(user.role)}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-400">Admin ID</p>
                <p className="text-sm text-white font-mono mt-2 break-all">{user.tenantId}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              Assignment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Parent Officer</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {user.parentOfficer?.fullName || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">State</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {user.assignedState?.geoState?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">LGA</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {user.assignedLga?.geoLga?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Ward</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {user.assignedWard?.geoWard?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Polling Unit</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {user.assignedPollingUnit?.geoPollingUnit?.name || 'N/A'}
                </p>
              </div>
              {user.assignedPollingUnit?.geoPollingUnit?.code && (
                <div>
                  <p className="text-sm text-gray-400">Polling Unit Code</p>
                  <p className="text-lg text-white font-semibold mt-2">
                    {user.assignedPollingUnit?.geoPollingUnit?.code}
                  </p>
                </div>
              )}
            </div>

            {/* Assigned Voters Section for FIELD_OFFICER */}
            {user.role === 'FIELD_OFFICER' && user.assignedVoters && user.assignedVoters.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#2a2a2e]">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Assigned Voters ({user.assignedVoters.length})
                </h3>
                <div className="space-y-3">
                  {user.assignedVoters.map((voter) => (
                    <div
                      key={voter.id}
                      className="p-4 bg-[#1a1a1d] border border-[#2a2a2e] rounded-lg hover:border-[#ca8a04]/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{voter.fullName}</h4>
                          <p className="text-sm text-gray-400 mt-1">{voter.phone}</p>
                          {voter.houseAddress && (
                            <p className="text-sm text-gray-400 mt-1">{voter.houseAddress}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-[#2a2a2e] text-[#888]">
                              {voter.state?.geoState?.name || 'N/A'}
                            </span>
                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-[#2a2a2e] text-[#888]">
                              {voter.lga?.geoLga?.name || 'N/A'}
                            </span>
                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-[#2a2a2e] text-[#888]">
                              {voter.ward?.geoWard?.name || 'N/A'}
                            </span>
                            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-[#2a2a2e] text-[#888]">
                              {voter.pollingUnit?.geoPollingUnit?.name || 'N/A'}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => navigate(`/voters/${voter.id}`)}
                          className="ml-4 text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold whitespace-nowrap"
                        >
                          View →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {canManageOtherUsers && !isOwnProfile && (
            <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
                Admin Actions
              </h2>
              <div className="space-y-3">
                {user.isActive ? (
                  <button
                    type="button"
                    onClick={handleDeactivate}
                    disabled={actionLoading === 'deactivate'}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {actionLoading === 'deactivate' ? 'Deactivating...' : 'Deactivate User'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleReactivate}
                    disabled={actionLoading === 'reactivate'}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {actionLoading === 'reactivate' ? 'Reactivating...' : 'Reactivate User'}
                  </button>
                )}

                <div className="rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] p-4 space-y-3">
                  <p className="text-sm text-white font-semibold">Reset Password</p>
                  <input
                    type="text"
                    value={tempPassword}
                    onChange={(event) => setTempPassword(event.target.value)}
                    placeholder="Enter temporary password"
                    className="w-full px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]"
                  />
                  <label className="inline-flex items-center gap-2 text-sm text-[#888]">
                    <input
                      type="checkbox"
                      checked={requirePasswordChange}
                      onChange={(event) => setRequirePasswordChange(event.target.checked)}
                      className="w-4 h-4 rounded bg-[#1a1a1d] border-[#2a2a2e] text-[#ca8a04] focus:ring-[#ca8a04] focus:ring-offset-0"
                    />
                    Require password change on next login
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={actionLoading === 'reset'}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {actionLoading === 'reset' ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              Metadata
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">User ID</p>
                <p className="text-xs text-white font-mono mt-2 break-all">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created</p>
                <p className="text-white mt-2">{new Date(user.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-white mt-2">{new Date(user.updatedAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <div className="mt-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      user.isActive ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                    }`}
                  >
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
