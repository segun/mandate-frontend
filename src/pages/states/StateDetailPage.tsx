import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { statesService, getStateName } from '../../services/states.service';
import type { State } from '../../services/states.service';

export function StateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

        {/* Assign Coordinator Button */}
        <div className="mt-6 pt-6 border-t border-[#2a2a2e]">
          <button
            type="button"
            onClick={() => {
              // TODO: Implement coordinator assignment in next phase
              alert('Coordinator assignment will be implemented in the next phase');
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
          >
            {state.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
          </button>
        </div>
      </div>

      {/* LGAs Section */}
      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2a2a2e] bg-[#1a1a1d]">
          <h2 className="text-lg font-semibold text-white">
            Local Government Areas ({state.lgas?.length || 0})
          </h2>
        </div>

        {!state.lgas || state.lgas.length === 0 ? (
          <div className="p-6 text-center text-[#888]">
            No LGAs have been added for this state yet.
            <div className="mt-4">
              <Link
                to="/lgas/new"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
              >
                + Add LGAs
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">LGA Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {state.lgas.map((lga) => (
                    <tr key={lga.id} className="hover:bg-[#1a1a1d]/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-[#ca8a04]">
                        {lga.geoLga?.name || lga.geoLgaId}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/lgas/${lga.id}`} className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-[#2a2a2e]">
              {state.lgas.map((lga) => (
                <div key={lga.id} className="p-4 flex justify-between items-center">
                  <span className="font-medium text-[#ca8a04]">{lga.geoLga?.name || lga.geoLgaId}</span>
                  <Link to={`/lgas/${lga.id}`} className="text-[#ca8a04] text-sm font-semibold">
                    View →
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
