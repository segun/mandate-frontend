import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { lgasService, getLgaName, getLgaStateName } from '../../services/lgas.service';
import type { LGA } from '../../services/lgas.service';
import { wardsService } from '../../services/wards.service';
import type { Ward } from '../../services/wards.service';
import { usersService } from '../../services/users.service';
import type { User } from '../../services/users.service';
import { UserSelectionModal } from '../../components/UserSelectionModal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DEFAULT_MODAL_PAGE_LIMIT, DEFAULT_PAGE_LIMIT } from '../../lib/api';

export function LGADetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lga, setLga] = useState<LGA | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [wards, setWards] = useState<Ward[]>([]);
  const [wardsLoading, setWardsLoading] = useState(false);
  const [wardsError, setWardsError] = useState('');

  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [assigningCoordinator, setAssigningCoordinator] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchLga = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await lgasService.getById(id);
        setLga(data);
        setError('');
      } catch (err: unknown) {
        const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to load LGA';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    const fetchWards = async () => {
      if (!id) return;
      setWardsLoading(true);
      try {
        const response = await wardsService.getAll(1, DEFAULT_PAGE_LIMIT, id);
        setWards(response.data);
        setWardsError('');
      } catch (err: unknown) {
        const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to load wards';
        setWards([]);
        setWardsError(message);
      } finally {
        setWardsLoading(false);
      }
    };

    fetchLga();
    fetchWards();
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

  const handleSelectCoordinator = (user: User) => {
    setSelectedUser(user);
    setShowConfirmDialog(true);
  };

  const handleConfirmAssign = async () => {
    if (!id || !selectedUser) return;
    setAssigningCoordinator(true);
    try {
      const updatedLga = await lgasService.assignCoordinator(id, selectedUser.id);
      setLga(updatedLga);
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

  if (error || !lga) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          {error || 'LGA not found'}
        </div>
        <button
          type="button"
          onClick={() => navigate('/lgas')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
        >
          ← Back to LGAs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">{getLgaName(lga)}</h1>
          <p className="text-sm text-[#888] mt-1">LGA details and wards</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/lgas')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">LGA Information</h2>
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${lga.isActive ? 'bg-green-500/20 text-green-400' : 'bg-[#2a2a2e] text-[#888]'}`}>
            {lga.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-[#888]">LGA Name</label>
            <p className="text-base text-white mt-1">{getLgaName(lga)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">State</label>
            <p className="text-base text-white mt-1">{getLgaStateName(lga) || 'Unknown state'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Coordinator</label>
            <p className="text-base text-white mt-1">{lga.coordinator?.fullName || 'Not assigned'}</p>
            {lga.coordinator?.email && (
              <p className="text-sm text-[#888]">{lga.coordinator.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Created</label>
            <p className="text-base text-white mt-1">{new Date(lga.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Total Wards</label>
            <p className="text-base text-white mt-1">{wards.length}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
          <button
            type="button"
            onClick={openUserModal}
            disabled={assigningCoordinator}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {assigningCoordinator ? 'Assigning...' : (lga.coordinator ? 'Change Coordinator' : 'Assign Coordinator')}
          </button>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2e] bg-[#1a1a1d]">
          <h2 className="text-lg font-semibold text-white">
            Wards ({wards.length})
          </h2>
        </div>

        {wardsLoading ? (
          <div className="p-6 text-center text-[#888]">Loading wards...</div>
        ) : wardsError ? (
          <div className="p-6 text-center text-red-400">{wardsError}</div>
        ) : wards.length === 0 ? (
          <div className="p-6 text-center text-[#888]">
            No wards have been added for this LGA yet.
            <div className="mt-4">
              <Link
                to="/wards/new"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
              >
                + Add Wards
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Ward Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Coordinator</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {wards.map((ward) => (
                    <tr key={ward.id} className="hover:bg-[#1a1a1d]/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-[#ca8a04]">
                        {ward.geoWard?.name || ward.geoWardId}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#888]">{ward.coordinator?.fullName || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${ward.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                          {ward.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-[#2a2a2e]">
              {wards.map((ward) => (
                <div key={ward.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-[#ca8a04]">{ward.geoWard?.name || ward.geoWardId}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${ward.isActive ? 'bg-[#ca8a04]/20 text-[#ca8a04]' : 'bg-[#2a2a2e] text-[#888]'}`}>
                      {ward.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-[#888]">{ward.coordinator?.fullName || 'No coordinator'}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <UserSelectionModal
        isOpen={showUserModal}
        title={lga.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
        users={users}
        loading={usersLoading}
        error={usersError}
        searchTerm={userSearchTerm}
        onSearchChange={handleSearchUsers}
        onSelect={handleSelectCoordinator}
        onCancel={() => setShowUserModal(false)}
      />

      <ConfirmDialog
        isOpen={showConfirmDialog}
        variant="info"
        title={lga?.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
        message={lga?.coordinator
          ? 'Are you sure you want to change the coordinator for this LGA?'
          : 'Are you sure you want to assign a coordinator to this LGA?'}
        confirmLabel="Yes, continue"
        cancelLabel="No, cancel"
        onConfirm={handleConfirmAssign}
        onCancel={() => { setShowConfirmDialog(false); setSelectedUser(null); }}
      />
    </div>
  );
}
