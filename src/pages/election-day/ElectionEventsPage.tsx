import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  electionResultsService,
  type ElectionEvent,
  type CreateEventPayload,
} from '../../services/election-results.service';
import { toast } from '../../stores/toast.store';

export function ElectionEventsPage() {
  const navigate = useNavigate();

  // List state
  const [events, setEvents] = useState<ElectionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Create form state
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CreateEventPayload>({
    name: '',
    electionType: 'Governorship',
    electionDate: '',
    status: 'ACTIVE',
  });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await electionResultsService.listEvents({ page, limit: 20 });
      setEvents(response.data);
      setTotalPages(response.meta.totalPages || 1);
    } catch {
      toast.error('Failed to load election events');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.electionDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setCreating(true);
    try {
      const event = await electionResultsService.createEvent(form);
      toast.success('Election event created successfully');
      setShowForm(false);
      setForm({ name: '', electionType: 'Governorship', electionDate: '', status: 'ACTIVE' });
      setEvents((prev) => [event, ...prev]);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to create election event';
      toast.error(message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Election Day</h1>
          <p className="text-sm text-[#888] mt-1">
            Create and manage election events, upload result forms, and track processing.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a]"
        >
          {showForm ? 'Cancel' : '+ New Event'}
        </button>
      </div>

      {/* Create Event Form */}
      {showForm && (
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
          <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
            <h2 className="text-lg font-semibold text-white">Create Election Event</h2>
          </div>
          <form onSubmit={handleCreate} className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">
                  Event Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Anambra Governorship 2026"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">Election Type</label>
                <select
                  value={form.electionType}
                  onChange={(e) => setForm({ ...form, electionType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                >
                  <option value="Presidential">Presidential</option>
                  <option value="Governorship">Governorship</option>
                  <option value="Senatorial">Senatorial</option>
                  <option value="House of Representatives">House of Representatives</option>
                  <option value="State House of Assembly">State House of Assembly</option>
                  <option value="Local Government">Local Government</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">
                  Election Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  value={form.electionDate}
                  onChange={(e) => setForm({ ...form, electionDate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="DRAFT">Draft</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {creating ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        </div>
      )}

      {/* Events List */}
      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Election Events</h2>
          <button
            onClick={fetchEvents}
            className="px-3 py-1.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-[#888]">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="p-10 text-center text-[#888]">
            No election events yet. Click "+ New Event" to create one.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2e]">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2a2e]">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-[#1a1a1d]/50">
                      <td className="px-4 py-3 text-sm text-[#ddd] font-medium">{event.name}</td>
                      <td className="px-4 py-3 text-sm text-[#bbb]">{event.electionType}</td>
                      <td className="px-4 py-3 text-sm text-[#bbb]">
                        {new Date(event.electionDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            event.status === 'ACTIVE'
                              ? 'bg-green-500/15 text-green-300'
                              : event.status === 'COMPLETED'
                                ? 'bg-[#ca8a04]/20 text-[#ca8a04]'
                                : 'bg-[#2a2a2e] text-[#bbb]'
                          }`}
                        >
                          {event.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            to={`/election-day/${event.id}/uploads`}
                            className="px-3 py-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1d] text-white text-xs font-semibold hover:bg-[#2a2a2e]"
                          >
                            Uploads
                          </Link>
                          <button
                            onClick={() => navigate(`/election-day/${event.id}/dashboard`)}
                            className="px-3 py-1.5 rounded-md border border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04] text-xs font-semibold hover:bg-[#ca8a04]/20"
                          >
                            Dashboard
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-[#2a2a2e]">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-[#888]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
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
