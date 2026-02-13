import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { votersService, type Voter } from '../../services/voters.service';
import { toast } from '../../stores/toast.store';
import { useAuthStore } from '../../stores/auth.store';

export default function ViewVoterPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();

  const [voter, setVoter] = useState<Voter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVoter = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Voter ID is required');
        const data = await votersService.getById(id);
        setVoter(data);
      } catch {
        toast.error('Failed to load voter');
        navigate('/voters');
      } finally {
        setLoading(false);
      }
    };
    loadVoter();
  }, [id, navigate]);

  const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      // PVC Status
      YES: 'bg-green-900 text-green-200',
      NO: 'bg-red-900 text-red-200',
      PROCESSING: 'bg-yellow-900 text-yellow-200',
      LOST: 'bg-gray-700 text-gray-200',

      // Support Level
      STRONG_SUPPORTER: 'bg-green-900 text-green-200',
      LEAN_SUPPORTER: 'bg-green-800 text-green-200',
      UNDECIDED: 'bg-yellow-900 text-yellow-200',
      LEAN_OPPOSITION: 'bg-red-800 text-red-200',
      STRONG_OPPOSITION: 'bg-red-900 text-red-200',

      // Engagement Status
      NOT_CONTACTED: 'bg-gray-700 text-gray-200',
      CONTACTED: 'bg-blue-900 text-blue-200',
      FOLLOW_UP: 'bg-blue-800 text-blue-200',
      FOLLOW_UP_NEEDED: 'bg-orange-900 text-orange-200',
      COMMITTED: 'bg-green-900 text-green-200',
      MOBILIZED: 'bg-green-800 text-green-200',
      UNREACHABLE: 'bg-red-900 text-red-200',

      // Voting Commitment
      WILL_VOTE: 'bg-green-900 text-green-200',
      LIKELY_VOTE: 'bg-green-800 text-green-200',
      UNKNOWN: 'bg-gray-700 text-gray-200',
      UNLIKELY_VOTE: 'bg-red-800 text-red-200',
      WILL_NOT_VOTE: 'bg-red-900 text-red-200',
      CONFIRMED: 'bg-blue-900 text-blue-200',
    };
    return statusMap[status] || 'bg-gray-700 text-gray-200';
  };

  const formatLabel = (text: string): string => {
    return text
      .split('_')
      .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
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

  if (!voter) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-red-500">Voter not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">{voter.fullName}</h1>
          <p className="text-sm text-[#888] mt-1">Voter Details</p>
        </div>
        <div className="flex items-center gap-3">
          {user?.role === 'SUPER_ADMIN' && (
            <button
              type="button"
              onClick={() => navigate(`/voters/${voter.id}/edit`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold hover:bg-[#d4940a] transition-colors"
            >
              Edit
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

      {/* Status Bar */}
      {!voter.isActive && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
          <p className="text-red-300 font-semibold">This voter has been deactivated</p>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-lg text-white font-semibold mt-2">{voter.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Phone Number</p>
                <p className="text-lg text-white font-semibold mt-2">{voter.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-400">House Address</p>
                <p className="text-lg text-white font-semibold mt-2">{voter.houseAddress || 'N/A'}</p>
              </div>
              {voter.notes && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-400">Notes</p>
                  <p className="text-white mt-2 whitespace-pre-wrap">{voter.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Hierarchy Information */}
          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              Hierarchy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">State</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {voter.state?.geoState?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">LGA</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {voter.lga?.geoLga?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Ward</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {voter.ward?.geoWard?.name || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Polling Unit</p>
                <p className="text-lg text-white font-semibold mt-2">
                  {voter.pollingUnit?.geoPollingUnit?.name || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* PVC & Support Information */}
          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              PVC & Support Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400">PVC Status</p>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(voter.pvcStatus)}`}>
                    {formatLabel(voter.pvcStatus)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">PVC Number</p>
                <p className="text-lg text-white font-semibold mt-2">{voter.pvcNumber || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Support Level</p>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(voter.supportLevel)}`}>
                    {formatLabel(voter.supportLevel)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Engagement Status</p>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(voter.engagementStatus)}`}>
                    {formatLabel(voter.engagementStatus)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Voting Commitment</p>
                <div className="mt-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(voter.votingCommitment)}`}>
                    {formatLabel(voter.votingCommitment)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary & Details */}
        <div className="space-y-6">
          {/* Assignment */}
          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              Assignment
            </h2>
            <div>
              <p className="text-sm text-gray-400">Assigned Canvasser</p>
              <p className="text-lg text-white font-semibold mt-4">
                {voter.assignedCanvasser?.fullName || 'Unassigned'}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white mb-6 pb-4 border-b border-[#2a2a2e]">
              Metadata
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Voter ID</p>
                <p className="text-xs text-white font-mono mt-2 break-all">{voter.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created</p>
                <p className="text-white mt-2">{new Date(voter.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-white mt-2">{new Date(voter.updatedAt).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <div className="mt-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      voter.isActive ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                    }`}
                  >
                    {voter.isActive ? 'Active' : 'Inactive'}
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
