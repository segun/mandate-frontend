
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { State, PaginatedResponse } from '../../services/states.service';
import { statesService, getStateName } from '../../services/states.service';

export function StatesPage() {
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchStates = async () => {
    setLoading(true);
    try {
      // Use name filter for search
      const response: PaginatedResponse<State> = await statesService.getAll(page, 50, search || undefined);
      setStates(response.data);
      setTotalPages(response.meta?.totalPages || 1);
      setError('');
    } catch {
      setError('Failed to fetch states');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchStates();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">States</h1>
          <p className="text-sm text-slate-600">Search and manage states</p>
        </div>
        <Link
          to="/states/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
        >
          + Add State
        </Link>
      </div>

      {!loading && error && states.length === 0 && (
        <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">{error}</div>
      )}

      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <form onSubmit={handleSearch} className="border-b border-slate-100 bg-slate-50/60 px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">🔍</div>
              <input
                type="text"
                placeholder="Search by name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-blue-800 text-white font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => { setSearch(''); setPage(1); }}
                className="px-3 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading...</div>
        ) : states.length === 0 ? (
          <div className="p-10 text-center text-slate-500">No states found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Coordinator</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">LGAs</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {states.map((state: State) => (
                    <tr key={state.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-primary">{getStateName(state)}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{state.coordinator?.fullName || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${state.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {state.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{state.lgas?.length || 0}</td>
                      <td className="px-4 py-3">
                        <Link to={`/states/${state.id}`} className="text-secondary hover:underline text-sm font-semibold">
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
              {states.map((state: State) => (
                <div key={state.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-primary">{getStateName(state)}</h3>
                    <Link to={`/states/${state.id}`} className="text-secondary text-sm font-semibold">
                      View →
                    </Link>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{state.coordinator?.fullName || 'No coordinator'}</p>
                  <div className="flex gap-2">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${state.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'}`}>
                      {state.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-600">
                      {state.lgas?.length || 0} LGAs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && states.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
            <button
              onClick={() => setPage((p: number) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
