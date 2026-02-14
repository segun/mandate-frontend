import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { statesService, getStateName } from '../../services/states.service';
import type { State } from '../../services/states.service';
import { usersService } from '../../services/users.service';
import type { User } from '../../services/users.service';
import { UserSelectionModal } from '../../components/UserSelectionModal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DEFAULT_MODAL_PAGE_LIMIT } from '../../lib/api';
import { useAuthStore } from '../../stores/auth.store';
import { UserRole } from '../../lib/permissions';

export function StateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isPlatformOwner = user?.role === UserRole.PLATFORM_OWNER;
  const [state, setState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // User selection modal state
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [assigningCoordinator, setAssigningCoordinator] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const data = await statesService.getById(id);
        setState(data);
        setError('');
      } catch (err: unknown) {
        const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to load state';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchState();
  }, [id]);

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await usersService.getAll(1, DEFAULT_MODAL_PAGE_LIMIT);
      setUsers(response.data);
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
    setShowUserModal(true);
    setUserSearchTerm('');
    await loadUsers();
  };

  const handleOpenUserModal = () => {
    openUserModal();
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
      setUsers(response.data);
      setUsersError('');
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to search users';
      setUsers([]);
      setUsersError(message);
    } finally {
      setUsersLoading(false);
    }
  };

  // Assign coordinator to state
  const handleSelectCoordinator = (user: User) => {
    setSelectedUser(user);
    setShowConfirmDialog(true);
  };

  const handleConfirmAssign = async () => {
    if (!id || !selectedUser) return;

    setAssigningCoordinator(true);
    try {
      const updatedState = await statesService.assignCoordinator(id, selectedUser.id);
      setState(updatedState);
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

  if (error || !state) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          {error || 'State not found'}
        </div>
        <button
          type="button"
          onClick={() => navigate('/states')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
        >
          ← Back to States
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">{getStateName(state)}</h1>
          <p className="text-sm text-[#888] mt-1">State details and LGAs</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/states')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* State Info Card */}
      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">State Information</h2>
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${state.isActive ? 'bg-green-500/20 text-green-400' : 'bg-[#2a2a2e] text-[#888]'}`}>
            {state.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-[#888]">State Name</label>
            <p className="text-base text-white mt-1">{getStateName(state)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Coordinator</label>
            <p className="text-base text-white mt-1">{state.coordinator?.fullName || 'Not assigned'}</p>
            {state.coordinator?.email && (
              <p className="text-sm text-[#888]">{state.coordinator.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Total LGAs</label>
            <p className="text-base text-white mt-1">{state.lgas?.length || 0}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Created</label>
            <p className="text-base text-white mt-1">
              {new Date(state.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {!isPlatformOwner && (
          <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
            <button
              type="button"
              onClick={handleOpenUserModal}
              disabled={assigningCoordinator}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {assigningCoordinator ? 'Assigning...' : (state.coordinator ? 'Change Coordinator' : 'Assign Coordinator')}
            </button>
          </div>
        )}
      </div>

      {/* LGAs Section */}
      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2e] bg-[#1a1a1d] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Local Government Areas ({state.lgas?.length || 0})
          </h2>
          <Link
            to="/lgas"
            className="text-sm text-[#ca8a04] hover:text-[#d4940a] font-semibold"
          >
            Manage Local Government Areas
          </Link>
        </div>

        {!state.lgas || state.lgas.length === 0 ? (
          <div className="p-6 text-center text-[#888]">
            No LGAs have been added for this state yet.
            {!isPlatformOwner && (
              <div className="mt-4">
                <Link
                  to="/lgas/new"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
                >
                  + Add LGAs
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">LGA Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {state.lgas.map((lga) => (
                    <tr
                      key={lga.id}
                      onClick={() => navigate(`/lgas/${lga.id}`)}
                      className="hover:bg-[#1a1a1d]/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-[#ca8a04]">
                        {lga.geoLga?.name || lga.geoLgaId}
                      </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#2a2a2e]">
              {state.lgas.map((lga) => (
                <div
                  key={lga.id}
                  onClick={() => navigate(`/lgas/${lga.id}`)}
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#1a1a1d]/50 transition-colors"
                >
                  <div>
                    <span className="font-medium text-[#ca8a04] block">{lga.geoLga?.name || lga.geoLgaId}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* User Selection Modal */}
      {!isPlatformOwner && (
        <UserSelectionModal
          isOpen={showUserModal}
          title={state.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
          users={users}
          loading={usersLoading}
          error={usersError}
          searchTerm={userSearchTerm}
          onSearchChange={handleSearchUsers}
          onSelect={handleSelectCoordinator}
          onCancel={() => setShowUserModal(false)}
        />
      )}

      {/* Confirm Assign/Change Coordinator */}
      {!isPlatformOwner && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          variant="info"
          title={state?.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
          message={state?.coordinator
            ? 'Are you sure you want to change the coordinator for this state?'
            : 'Are you sure you want to assign a coordinator to this state?'}
          confirmLabel="Yes, continue"
          cancelLabel="No, cancel"
          onConfirm={handleConfirmAssign}
          onCancel={() => { setShowConfirmDialog(false); setSelectedUser(null); }}
        />
      )}
    </div>
  );
}
