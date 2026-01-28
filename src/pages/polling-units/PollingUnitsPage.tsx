import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { PollingUnit, PaginatedResponse } from '../../services/polling-units.service';
import { pollingUnitsService } from '../../services/polling-units.service';

export function PollingUnitsPage() {
  const [pollingUnits, setPollingUnits] = useState<PollingUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchPollingUnits = useCallback(async () => {
    setLoading(true);
    try {
      let response: PaginatedResponse<PollingUnit>;
      if (search) {
        response = await pollingUnitsService.search(search, page);
      } else {
        response = await pollingUnitsService.getAll(page);
      }
      setPollingUnits(response.data);
      setTotalPages(response.meta.totalPages);
    } catch {
      // Optionally handle error
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchPollingUnits();
  }, [fetchPollingUnits]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPollingUnits();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Polling Units</h1>
          <p className="text-sm text-slate-600">Search and manage polling units</p>
        </div>
        <Link
          to="/polling-units/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
        >
          + Add Polling Unit
        </Link>
      </div>
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
        ) : pollingUnits.length === 0 ? (
          <div className="p-10 text-center text-slate-500">No polling units found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Ward</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pollingUnits.map((unit) => (
                    <tr key={unit.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-primary">{unit.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{unit.code}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{unit.wardId}</td>
                      <td className="px-4 py-3">
                        <Link to={`/polling-units/${unit.id}`} className="text-secondary hover:underline text-sm font-semibold">
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
              {pollingUnits.map((unit) => (
                <div key={unit.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-primary">{unit.name}</h3>
                    <Link to={`/polling-units/${unit.id}`} className="text-secondary text-sm font-semibold">
                      View →
                    </Link>
                  </div>
                  <p className="text-sm text-slate-500 mb-2">{unit.code}</p>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-slate-100 text-slate-600">
                    Ward: {unit.wardId}
                  </span>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {!loading && pollingUnits.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm border border-slate-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
