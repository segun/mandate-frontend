import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { wardsService, getWardLgaName, getWardName, getWardStateName } from '../../services/wards.service';
import type { Ward } from '../../services/wards.service';
import { lgasService, getLgaStateName } from '../../services/lgas.service';
import { usersService } from '../../services/users.service';
import type { User } from '../../services/users.service';
import { UserSelectionModal } from '../../components/UserSelectionModal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DEFAULT_MODAL_PAGE_LIMIT } from '../../lib/api';
import { useAuthStore } from '../../stores/auth.store';
import { filterUsersForAssignmentLevel, UserRole } from '../../lib/permissions';

export function WardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isPlatformOwner = user?.role === UserRole.PLATFORM_OWNER;
  const canAssignWardCoordinator = [
    UserRole.SUPER_ADMIN,
    UserRole.CAMPAIGN_DIRECTOR,
    UserRole.STATE_COORDINATOR,
    UserRole.LGA_COORDINATOR,
  ];
  const canAssignWardCoordinatorRole = new Set<string>(canAssignWardCoordinator).has(user?.role ?? '');

  const [ward, setWard] = useState<Ward | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stateName, setStateName] = useState('');

  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [assigningCoordinator, setAssigningCoordinator] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  type PollingUnitSummary = {
    id: string;
    isActive?: boolean;
    geoPollingUnit?: {
      name?: string;
      code?: string;
    };
  };

  type WardWithPollingUnits = Ward & {
    pollingUnits?: PollingUnitSummary[];
  };

  useEffect(() => {
    const fetchWard = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await wardsService.getById(id);
        setWard(data);
        const wardState = getWardStateName(data);
        setStateName(wardState);
        if (!wardState && data.lgaId) {
          try {
            const lga = await lgasService.getById(data.lgaId);
            setStateName(getLgaStateName(lga));
          } catch {
            // Ignore; keep existing stateName fallback
          }
        }
        setError('');
      } catch (err: unknown) {
        const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to load ward';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchWard();
  }, [id]);

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await usersService.getAll(1, DEFAULT_MODAL_PAGE_LIMIT);
      setUsers(filterUsersForAssignmentLevel(response.data, 'ward'));
      setUsersError('');
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to load users';
      setUsers([]);
      setUsersError(message);
    } finally {
      setUsersLoading(false);
    }
  };

  const openUserModal = async () => {
    if (!canAssignWardCoordinatorRole) return;
    setShowUserModal(true);
    setUserSearchTerm('');
    await loadUsers();
  };

  const handleSearchUsers = async (term: string) => {
    const previousTerm = userSearchTerm;
    setUserSearchTerm(term);
    const trimmed = term.trim();

    if (trimmed.length < 3) {
      if (previousTerm.trim().length >= 3) {
        await loadUsers();
      }
      return;
    }

    setUsersLoading(true);
    try {
      const response = await usersService.search(trimmed, 1, DEFAULT_MODAL_PAGE_LIMIT);
      setUsers(filterUsersForAssignmentLevel(response.data, 'ward'));
      setUsersError('');
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to search users';
      setUsers([]);
      setUsersError(message);
    } finally {
      setUsersLoading(false);
    }
  };

  const handleSelectCoordinator = (user: User) => {
    setSelectedUser(user);
    setShowConfirmDialog(true);
  };

  const handleConfirmAssign = async () => {
    if (!canAssignWardCoordinatorRole) return;
    if (!id || !selectedUser) return;
    setAssigningCoordinator(true);
    try {
      const updatedWard = await wardsService.assignCoordinator(id, selectedUser.id);
      setWard(updatedWard);
      setError('');
      setShowUserModal(false);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to assign coordinator';
      setError(message);
    } finally {
      setAssigningCoordinator(false);
      setShowConfirmDialog(false);
      setSelectedUser(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-10 text-[#888]">Loading...</div>
      </div>
    );
  }

  if (error || !ward) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          {error || 'Ward not found'}
        </div>
        <button
          type="button"
          onClick={() => navigate('/wards')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
        >
          Back to Wards
        </button>
      </div>
    );
  }

  const wardWithPollingUnits = ward as WardWithPollingUnits;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">{getWardName(ward)}</h1>
          <p className="text-sm text-[#888] mt-1">Ward details and polling units</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/wards')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">Ward Information</h2>
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${ward.isActive ? 'bg-green-500/20 text-green-400' : 'bg-[#2a2a2e] text-[#888]'}`}>
            {ward.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-[#888]">Ward Name</label>
            <p className="text-base text-white mt-1">{getWardName(ward)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">LGA</label>
            <p className="text-base text-white mt-1">{getWardLgaName(ward) || 'Unknown LGA'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">State</label>
            <p className="text-base text-white mt-1">{stateName || getWardStateName(ward) || 'Unknown state'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Coordinator</label>
            <p className="text-base text-white mt-1">{ward.coordinator?.fullName || 'Not assigned'}</p>
            {ward.coordinator?.email && (
              <p className="text-sm text-[#888]">{ward.coordinator.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Created</label>
            <p className="text-base text-white mt-1">{new Date(ward.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {!isPlatformOwner && canAssignWardCoordinatorRole && (
          <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
            <button
              type="button"
              onClick={openUserModal}
              disabled={assigningCoordinator}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {assigningCoordinator ? 'Assigning...' : (ward.coordinator ? 'Change Coordinator' : 'Assign Coordinator')}
            </button>
          </div>
        )}
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2e] bg-[#1a1a1d] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Polling Units ({wardWithPollingUnits.pollingUnits?.length || 0})</h2>
          <Link
            to="/polling-units"
            className="text-sm text-[#ca8a04] hover:text-[#d4940a] font-semibold"
          >
            Manage Polling Units
          </Link>
        </div>

        {!wardWithPollingUnits.pollingUnits || wardWithPollingUnits.pollingUnits.length === 0 ? (
          <div className="p-6 text-center text-[#888]">No polling units have been added for this ward yet.</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {wardWithPollingUnits.pollingUnits.map((unit) => (
                    <tr 
                      key={unit.id} 
                      onClick={() => navigate(`/polling-units/${unit.id}`)}
                      className="hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-[#ca8a04]">{unit.geoPollingUnit?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-[#ca8a04]">{unit.geoPollingUnit?.code || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-[#2a2a2e]">
              {wardWithPollingUnits.pollingUnits.map((unit) => (
                <div 
                  key={unit.id} 
                  className="p-4 cursor-pointer hover:bg-[#1a1a1d]/50 transition-colors"
                  onClick={() => navigate(`/polling-units/${unit.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#ca8a04]">{unit.geoPollingUnit?.name || 'N/A'}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${unit.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                      {unit.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-[#ca8a04] mb-1">Code: {unit.geoPollingUnit?.code || 'N/A'}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {!isPlatformOwner && canAssignWardCoordinatorRole && (
        <UserSelectionModal
          isOpen={showUserModal}
          title={ward.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
          users={users}
          loading={usersLoading}
          error={usersError}
          searchTerm={userSearchTerm}
          onSearchChange={handleSearchUsers}
          onSelect={handleSelectCoordinator}
          onCancel={() => setShowUserModal(false)}
        />
      )}

      {!isPlatformOwner && canAssignWardCoordinatorRole && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          variant="info"
          title={ward?.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
          message={ward?.coordinator
            ? 'Are you sure you want to change the coordinator for this ward?'
            : 'Are you sure you want to assign a coordinator to this ward?'}
          confirmLabel="Yes, continue"
          cancelLabel="No, cancel"
          onConfirm={handleConfirmAssign}
          onCancel={() => { setShowConfirmDialog(false); setSelectedUser(null); }}
        />
      )}
    </div>
  );
}
