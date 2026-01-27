import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Ward } from '../../services/wards.service';
import { wardsService } from '../../services/wards.service';

export function WardsPage() {
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await wardsService.getAll();
        setWards(response.data);
      } catch (error) {
        console.error('Failed to fetch wards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWards();
  }, []);

  const filteredWards = wards.filter((ward) => {
    const term = search.toLowerCase();
    return ward.name.toLowerCase().includes(term) || ward.code.toLowerCase().includes(term);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">Wards</h1>
          <p className="text-sm text-slate-600">Browse, search, and manage wards</p>
        </div>
        <Link
          to="/wards/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-800 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition-colors"
        >
          + Add Ward
        </Link>
      </div>

      {/* Content */}
      <div className="bg-surface rounded-2xl shadow-card border border-slate-100 overflow-hidden">
        <form
          className="border-b border-slate-100 bg-slate-50/60 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex-1 flex items-center gap-2">
            <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">🔍</div>
            <input
              type="text"
              placeholder="Search by ward name or code"
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
              onClick={() => setSearch('')}
              className="px-3 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 hover:border-blue-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading...</div>
        ) : filteredWards.length === 0 ? (
          <div className="p-10 text-center text-slate-500">No wards found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredWards.map((ward) => (
                    <tr key={ward.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-mono text-slate-600">{ward.code}</td>
                      <td className="px-4 py-3 text-sm font-medium text-primary">{ward.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          ward.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {ward.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/wards/${ward.id}`} className="text-secondary hover:underline text-sm font-semibold">
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
                  {filteredWards.map((ward) => (
                <div key={ward.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-primary">{ward.name}</h3>
                      <p className="text-sm font-mono text-slate-500">{ward.code}</p>
                    </div>
                      <Link to={`/wards/${ward.id}`} className="text-secondary text-sm font-semibold">
                      View →
                    </Link>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    ward.isActive ? 'bg-secondary text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {ward.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
