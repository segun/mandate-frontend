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
        <div className="text-center py-10 text-slate-500">Loading...</div>
      </div>
    );
  }

  if (error || !state) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
          {error || 'State not found'}
        </div>
        <button
          type="button"
          onClick={() => navigate('/states')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
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
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">{getStateName(state)}</h1>
          <p className="text-sm text-slate-600 mt-1">State details and LGAs</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/states')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* State Info Card */}
      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-800">State Information</h2>
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${state.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {state.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-slate-500">State Name</label>
            <p className="text-base text-slate-800 mt-1">{getStateName(state)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Coordinator</label>
            <p className="text-base text-slate-800 mt-1">{state.coordinator?.fullName || 'Not assigned'}</p>
            {state.coordinator?.email && (
              <p className="text-sm text-slate-500">{state.coordinator.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Total LGAs</label>
            <p className="text-base text-slate-800 mt-1">{state.lgas?.length || 0}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-500">Created</label>
            <p className="text-base text-slate-800 mt-1">
              {new Date(state.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Assign Coordinator Button */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              // TODO: Implement coordinator assignment in next phase
              alert('Coordinator assignment will be implemented in the next phase');
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-800 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
          >
            {state.coordinator ? 'Change Coordinator' : 'Assign Coordinator'}
          </button>
        </div>
      </div>

      {/* LGAs Section */}
      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <h2 className="text-lg font-semibold text-slate-800">
            Local Government Areas ({state.lgas?.length || 0})
          </h2>
        </div>

        {!state.lgas || state.lgas.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            No LGAs have been added for this state yet.
            <div className="mt-4">
              <Link
                to="/lgas/new"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-800 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
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
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">LGA Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.lgas.map((lga) => (
                    <tr key={lga.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-primary">
                        {lga.geoLga?.name || lga.geoLgaId}
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/lgas/${lga.id}`} className="text-secondary hover:underline text-sm font-semibold">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-100">
              {state.lgas.map((lga) => (
                <div key={lga.id} className="p-4 flex justify-between items-center">
                  <span className="font-medium text-primary">{lga.geoLga?.name || lga.geoLgaId}</span>
                  <Link to={`/lgas/${lga.id}`} className="text-secondary text-sm font-semibold">
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
