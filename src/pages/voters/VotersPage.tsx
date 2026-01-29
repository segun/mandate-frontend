import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Voter, PaginatedResponse } from '../../services/voters.service';
import { votersService, getVoterWardName, getVoterPollingUnitName } from '../../services/voters.service';

export function VotersPage() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchVoters = useCallback(async () => {
    setLoading(true);
    try {
      let response: PaginatedResponse<Voter>;
      if (search) {
        response = await votersService.search(search, page);
      } else {
        response = await votersService.getAll(page);
      }
      setVoters(response.data);
      setTotalPages(response.meta?.totalPages || 1);
      setError('');
    } catch {
      setError('Failed to fetch voters');
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchVoters();
  }, [fetchVoters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchVoters();
  };

  const getSupportLevelBadge = (level: string) => {
    const styles: Record<string, string> = {
      'STRONG_SUPPORTER': 'bg-[#ca8a04]/20 text-[#ca8a04]',
      'LEAN_SUPPORTER': 'bg-green-500/20 text-green-400',
      'UNDECIDED': 'bg-[#2a2a2e] text-[#888]',
      'LEAN_OPPOSITION': 'bg-amber-500/20 text-amber-400',
      'STRONG_OPPOSITION': 'bg-red-500/20 text-red-400',
    };
    return styles[level] || 'bg-[#2a2a2e] text-[#888]';
  };

  const getPvcBadge = (status: string) => {
    const styles: Record<string, string> = {
      'YES': 'bg-[#ca8a04]/20 text-[#ca8a04]',
      'NO': 'bg-[#2a2a2e] text-[#888]',
      'PROCESSING': 'bg-blue-500/20 text-blue-400',
      'LOST': 'bg-red-500/20 text-red-400',
    };
    return styles[status] || 'bg-[#2a2a2e] text-[#888]';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Voters</h1>
          <p className="text-sm text-[#888]">Search and manage registrations</p>
        </div>
        <Link
          to="/voters/new"
          className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ca8a04] text-[#0d0d0f] font-semibold rounded-lg shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
        >
          + Add Voter
        </Link>
      </div>

      {!loading && error && voters.length === 0 && (
        <div className="mb-4 text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-4">{error}</div>
      )}

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <form onSubmit={handleSearch} className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-2">
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-[#ca8a04]/10 text-[#ca8a04]">🔍</div>
              <input
                type="text"
                placeholder="Search by name, phone, or PVC number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04] focus:border-transparent placeholder:text-[#666]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ca8a04] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => { setSearch(''); setPage(1); }}
                className="px-3 py-2.5 rounded-lg border border-[#ca8a04] bg-transparent text-[#ca8a04] font-semibold hover:bg-[#ca8a04]/10 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
        {loading ? (
          <div className="p-10 text-center text-[#888]">Loading...</div>
        ) : voters.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No voters found</div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1a1a1d] border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Phone</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Ward</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Polling Unit</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">PVC Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Support Level</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {voters.map((voter) => (
                    <tr key={voter.id} className="hover:bg-[#1a1a1d]/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-white">{voter.fullName}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{voter.phone}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{getVoterWardName(voter)}</td>
                      <td className="px-4 py-3 text-sm text-[#888]">{getVoterPollingUnitName(voter)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getPvcBadge(voter.pvcStatus)}`}>
                          {voter.pvcStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getSupportLevelBadge(voter.supportLevel)}`}>
                          {voter.supportLevel.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link to={`/voters/${voter.id}`} className="text-[#ca8a04] hover:text-[#d4940a] text-sm font-semibold">
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
              {voters.map((voter) => (
                <div key={voter.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{voter.fullName}</h3>
                    <Link to={`/voters/${voter.id}`} className="text-[#ca8a04] text-sm font-semibold">
                      View →
                    </Link>
                  </div>
                  <p className="text-sm text-[#888] mb-1">{voter.phone}</p>
                  <p className="text-sm text-[#888] mb-2">{getVoterWardName(voter)} • {getVoterPollingUnitName(voter)}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getPvcBadge(voter.pvcStatus)}`}>
                      PVC: {voter.pvcStatus}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getSupportLevelBadge(voter.supportLevel)}`}>
                      {voter.supportLevel.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        {!loading && voters.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#2a2a2e] bg-[#1a1a1d]">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-[#888]">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2a2e] transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
