import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { pollingUnitsService, getPollingUnitName, getPollingUnitCode } from '../../services/polling-units.service';
import type { PollingUnit } from '../../services/polling-units.service';
import { usersService } from '../../services/users.service';
import type { User } from '../../services/users.service';
import { UserSelectionModal } from '../../components/UserSelectionModal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DEFAULT_MODAL_PAGE_LIMIT } from '../../lib/api';

export function PollingUnitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pollingUnit, setPollingUnit] = useState<PollingUnit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [assigningSupervisor, setAssigningSupervisor] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchPollingUnit = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await pollingUnitsService.getById(id);
        setPollingUnit(data);
        setError('');
      } catch (err: unknown) {
        const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to load polling unit';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPollingUnit();
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

  const handleSelectSupervisor = (user: User) => {
    setSelectedUser(user);
    setShowConfirmDialog(true);
  };

  const handleConfirmAssign = async () => {
    if (!id || !selectedUser) return;
    setAssigningSupervisor(true);
    try {
      const updatedPollingUnit = await pollingUnitsService.assignSupervisor(id, selectedUser.id);
      setPollingUnit(updatedPollingUnit);
      setError('');
      setShowUserModal(false);
    } catch (err: unknown) {
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to assign supervisor';
      setError(message);
    } finally {
      setAssigningSupervisor(false);
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

  if (error || !pollingUnit) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          {error || 'Polling unit not found'}
        </div>
        <button
          type="button"
          onClick={() => navigate('/polling-units')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
        >
          Back to Polling Units
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">{getPollingUnitName(pollingUnit)}</h1>
          <p className="text-sm text-[#888] mt-1">Polling unit details and voters</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/polling-units')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e] transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">Polling Unit Information</h2>
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${pollingUnit.isActive ? 'bg-green-500/20 text-green-400' : 'bg-[#2a2a2e] text-[#888]'}`}>
            {pollingUnit.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-[#888]">Name</label>
            <p className="text-base text-white mt-1">{getPollingUnitName(pollingUnit)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Code</label>
            <p className="text-base text-white mt-1">{getPollingUnitCode(pollingUnit)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Ward</label>
            <p className="text-base text-white mt-1">
              {pollingUnit.ward?.geoWard?.name || 'Unknown'}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Supervisor</label>
            <p className="text-base text-white mt-1">{pollingUnit.supervisor?.fullName || 'Not assigned'}</p>
            {pollingUnit.supervisor?.email && (
              <p className="text-sm text-[#888]">{pollingUnit.supervisor.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-[#888]">Created</label>
            <p className="text-base text-white mt-1">{new Date(pollingUnit.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
          <button
            type="button"
            onClick={openUserModal}
            disabled={assigningSupervisor}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {assigningSupervisor ? 'Assigning...' : (pollingUnit.supervisor ? 'Change Supervisor' : 'Assign Supervisor')}
          </button>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2e] bg-[#1a1a1d] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Voters ({pollingUnit.voters?.length || 0})</h2>
          <Link
            to="/voters"
            className="text-sm text-[#ca8a04] hover:text-[#d4940a] font-semibold"
          >
            Manage Voters
          </Link>
        </div>

        {!pollingUnit.voters || pollingUnit.voters.length === 0 ? (
          <div className="p-6 text-center text-[#888]">No voters have been added for this polling unit yet.</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">PVC Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Support Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {pollingUnit.voters.map((voter) => (
                    <tr key={voter.id} className="hover:bg-[#1a1a1d]/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-white">{voter.fullName}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{voter.phone}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{voter.pvcStatus}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{voter.supportLevel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-[#2a2a2e]">
              {pollingUnit.voters.map((voter) => (
                <div key={voter.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{voter.fullName}</h3>
                  </div>
                  <p className="text-sm text-[#888] mb-1">Phone: {voter.phone}</p>
                  <p className="text-sm text-[#888] mb-1">PVC Status: {voter.pvcStatus}</p>
                  <p className="text-sm text-[#888]">Support Level: {voter.supportLevel}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <UserSelectionModal
        isOpen={showUserModal}
        title={pollingUnit.supervisor ? 'Change Supervisor' : 'Assign Supervisor'}
        users={users}
        loading={usersLoading}
        error={usersError}
        searchTerm={userSearchTerm}
        onSearchChange={handleSearchUsers}
        onSelect={handleSelectSupervisor}
        onCancel={() => setShowUserModal(false)}
      />

      <ConfirmDialog
        isOpen={showConfirmDialog}
        variant="info"
        title={pollingUnit?.supervisor ? 'Change Supervisor' : 'Assign Supervisor'}
        message={pollingUnit?.supervisor
          ? 'Are you sure you want to change the supervisor for this polling unit?'
          : 'Are you sure you want to assign a supervisor to this polling unit?'}
        confirmLabel="Yes, continue"
        cancelLabel="No, cancel"
        onConfirm={handleConfirmAssign}
        onCancel={() => { setShowConfirmDialog(false); setSelectedUser(null); }}
      />
    </div>
  );
}
