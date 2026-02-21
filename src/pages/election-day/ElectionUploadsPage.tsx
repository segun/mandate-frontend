import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  electionResultsService,
  type ElectionEvent,
  type ElectionEventStats,
  type ElectionUpload,
  type ElectionUploadStatus,
  TERMINAL_STATUSES,
} from '../../services/election-results.service';
import {
  getElectionResultsSocket,
  disconnectElectionResultsSocket,
} from '../../lib/electionResultsSocket';
import { IncidentReportsPanel } from '../incidents/IncidentReportsPage';
import { toast } from '../../stores/toast.store';

const STATUS_STYLES: Record<ElectionUploadStatus, string> = {
  PENDING: 'bg-blue-500/15 text-blue-300',
  PROCESSING: 'bg-yellow-500/15 text-yellow-300',
  EXTRACTED: 'bg-green-500/15 text-green-300',
  REVIEW_REQUIRED: 'bg-orange-500/15 text-orange-300',
  CONFIRMED: 'bg-[#ca8a04]/20 text-[#ca8a04]',
  REJECTED: 'bg-red-500/15 text-red-300',
  FAILED: 'bg-red-500/15 text-red-400',
};

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_FILE_SIZE = 12 * 1024 * 1024; // 12MB

export function ElectionUploadsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Event info
  const [event, setEvent] = useState<ElectionEvent | null>(null);
  const [eventStats, setEventStats] = useState<ElectionEventStats | null>(null);

  // Upload form
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Upload list
  const [uploads, setUploads] = useState<ElectionUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'form-e8' | 'incidents'>(() => {
    const tab = searchParams.get('tab');
    return tab === 'incidents' ? 'incidents' : 'form-e8';
  });

  // Track which uploads we've shown terminal toasts for
  const terminalToastShownRef = useRef<Set<string>>(new Set());

  const fetchEventDetail = useCallback(async () => {
    if (!eventId) return;
    try {
      const eventDetail = await electionResultsService.getEvent(eventId);
      setEvent(eventDetail.event);
      setEventStats(eventDetail.stats);
    } catch {
      toast.error('Failed to load event details');
    }
  }, [eventId]);

  // Fetch event info
  useEffect(() => {
    fetchEventDetail();
  }, [fetchEventDetail]);

  // Fetch uploads
  const fetchUploads = useCallback(async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const response = await electionResultsService.listUploads({
        page,
        limit: 20,
        eventId,
        status: statusFilter || undefined,
      });
      setUploads(response.data);
      setTotalPages(response.meta.totalPages || 1);
    } catch {
      toast.error('Failed to load uploads');
      setUploads([]);
    } finally {
      setLoading(false);
    }
  }, [eventId, page, statusFilter]);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'incidents' && activeTab !== 'incidents') {
      setActiveTab('incidents');
      return;
    }
    if ((tab === 'form-e8' || !tab) && activeTab !== 'form-e8') {
      setActiveTab('form-e8');
    }
  }, [searchParams, activeTab]);

  const handleTabChange = (tab: 'form-e8' | 'incidents') => {
    setActiveTab(tab);
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set('tab', tab);
      return nextParams;
    });
  };

  // WebSocket for real-time status updates
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const socket = getElectionResultsSocket(accessToken);

    const handleStatus = (payload: Partial<ElectionUpload> & { id: string }) => {
      if (!payload?.id) return;

      setUploads((prev) => {
        const found = prev.find((u) => u.id === payload.id);
        if (!found) return prev;
        return prev.map((u) => (u.id === payload.id ? { ...u, ...payload } : u));
      });

      // Show toast for terminal statuses
      const status = payload.status;
      if (status && TERMINAL_STATUSES.includes(status) && !terminalToastShownRef.current.has(payload.id)) {
        terminalToastShownRef.current.add(payload.id);
        if (status === 'FAILED') {
          toast.error(`Upload processing failed`);
        } else if (status === 'REVIEW_REQUIRED') {
          toast.warning('Upload needs review');
        } else if (status === 'EXTRACTED') {
          toast.success('Upload extracted successfully');
        } else if (status === 'CONFIRMED') {
          toast.success('Upload confirmed');
        }
      }
    };

    socket.on('upload:status', handleStatus);

    // Subscribe to all current uploads that are in-progress
    const currentUploads = uploads;
    currentUploads.forEach((u) => {
      if (!TERMINAL_STATUSES.includes(u.status)) {
        socket.emit('upload:subscribe', { uploadId: u.id });
      }
    });

    return () => {
      socket.off('upload:status', handleStatus);
      // Unsubscribe
      currentUploads.forEach((u) => {
        if (!TERMINAL_STATUSES.includes(u.status)) {
          socket.emit('upload:unsubscribe', { uploadId: u.id });
        }
      });
      disconnectElectionResultsSocket();
    };
  }, [uploads]);

  // Handle file upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !eventId) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Only JPEG, PNG, and PDF files are allowed');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be under 12MB');
      return;
    }

    setUploading(true);
    try {
      const upload = await electionResultsService.uploadForm(eventId, file);
      toast.success('Form uploaded successfully — processing started');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploads((prev) => [upload, ...prev]);

      // Subscribe to new upload via socket
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const socket = getElectionResultsSocket(accessToken);
        socket.emit('upload:subscribe', { uploadId: upload.id });
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to upload form';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  // Handle reprocess
  const handleReprocess = async (uploadId: string) => {
    try {
      const updated = await electionResultsService.reprocess(uploadId);
      toast.success('Reprocessing started');
      setUploads((prev) => prev.map((u) => (u.id === uploadId ? updated : u)));
      terminalToastShownRef.current.delete(uploadId);

      // Re-subscribe
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const socket = getElectionResultsSocket(accessToken);
        socket.emit('upload:subscribe', { uploadId });
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to reprocess';
      toast.error(message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">
            {event?.name || 'Election Uploads'}
          </h1>
          <p className="text-sm text-[#888] mt-1">
            {event ? `${event.electionType} — ${new Date(event.electionDate).toLocaleDateString()}` : 'Upload and track Form E8 results'}
          </p>
          {event?.status && (
            <span className="inline-block mt-2 px-2 py-0.5 rounded border border-[#2a2a2e] text-xs text-[#bbb]">
              {event.status}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            to="/election-day"
            className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
          >
            Back to Events
          </Link>
          {eventId && (
            <Link
              to={`/election-day/${eventId}/dashboard`}
              className="px-3 py-2 rounded-lg border border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04] text-sm font-semibold hover:bg-[#ca8a04]/20"
            >
              View Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl border border-[#2a2a2e] p-2 inline-flex gap-2">
        <button
          onClick={() => handleTabChange('form-e8')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'form-e8'
              ? 'bg-[#ca8a04] text-[#0d0d0f]'
              : 'text-[#bbb] bg-[#1a1a1d] hover:bg-[#2a2a2e]'
          }`}
        >
          Form E8 Upload
        </button>
        <button
          onClick={() => handleTabChange('incidents')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            activeTab === 'incidents'
              ? 'bg-[#ca8a04] text-[#0d0d0f]'
              : 'text-[#bbb] bg-[#1a1a1d] hover:bg-[#2a2a2e]'
          }`}
        >
          Incident Reports
        </button>
      </div>

      {activeTab === 'form-e8' ? (
        <>
          {eventStats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] p-3">
                <p className="text-xs text-[#888] uppercase tracking-wide">Total</p>
                <p className="text-lg font-semibold text-white mt-1">{eventStats.totalUploads}</p>
              </div>
              <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] p-3">
                <p className="text-xs text-[#888] uppercase tracking-wide">Processing</p>
                <p className="text-lg font-semibold text-yellow-300 mt-1">{eventStats.processing}</p>
              </div>
              <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] p-3">
                <p className="text-xs text-[#888] uppercase tracking-wide">Needs Review</p>
                <p className="text-lg font-semibold text-orange-300 mt-1">{eventStats.reviewRequired}</p>
              </div>
              <div className="bg-[#141417] rounded-xl border border-[#2a2a2e] p-3">
                <p className="text-xs text-[#888] uppercase tracking-wide">Confirmed</p>
                <p className="text-lg font-semibold text-[#ca8a04] mt-1">{eventStats.confirmed}</p>
              </div>
            </div>
          )}

          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
            <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
              <h2 className="text-lg font-semibold text-white">Upload Form E8</h2>
            </div>
            <div className="p-4 sm:p-6">
              <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-start md:items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                      fileInputRef.current.click();
                    }
                  }}
                  className="px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e]"
                >
                  Choose file
                </button>
                <div className="w-full md:max-w-md px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white truncate">
                  {file ? file.name : 'No file selected (JPEG, PNG, or PDF — max 12MB)'}
                </div>
                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : 'Upload Form'}
                </button>
              </form>
            </div>
          </div>

          <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
            <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
              <h2 className="text-lg font-semibold text-white">Uploads</h2>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setPage(1);
                    setStatusFilter(e.target.value);
                  }}
                  className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
                >
                  <option value="">All statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="EXTRACTED">Extracted</option>
                  <option value="REVIEW_REQUIRED">Review Required</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="FAILED">Failed</option>
                </select>
                <button
                  onClick={() => {
                    fetchUploads();
                    fetchEventDetail();
                  }}
                  className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e]"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <div className="text-[#888]">Loading uploads...</div>
              ) : uploads.length === 0 ? (
                <div className="text-[#888]">No uploads found. Upload a Form E8 above to get started.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-[#2a2a2e]">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">File</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Uploaded By</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Confidence</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Updated</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2a2a2e]">
                      {uploads.map((upload) => (
                        <tr key={upload.id} className="hover:bg-[#1a1a1d]/50">
                          <td className="px-4 py-3 text-sm text-[#ddd] font-medium">
                            {upload.sourceFileName}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#bbb]">
                            {upload.uploadedBy?.fullName || upload.uploadedByUserId || '—'}
                            {upload.uploadedBy?.role && (
                              <div className="text-xs text-[#888] mt-0.5">{upload.uploadedBy.role}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                STATUS_STYLES[upload.status] || 'bg-[#2a2a2e] text-[#bbb]'
                              }`}
                            >
                              {upload.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#bbb]">
                            {upload.overallConfidence != null
                              ? `${(upload.overallConfidence * 100).toFixed(1)}%`
                              : '—'}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#bbb]">
                            {new Date(upload.updatedAt).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                to={`/election-day/${eventId}/uploads/${upload.id}`}
                                className="px-3 py-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1d] text-white text-xs font-semibold hover:bg-[#2a2a2e]"
                              >
                                Details
                              </Link>
                              {(upload.status === 'REVIEW_REQUIRED' || upload.status === 'EXTRACTED') && (
                                <Link
                                  to={`/election-day/${eventId}/uploads/${upload.id}`}
                                  className="px-3 py-1.5 rounded-md border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold hover:bg-orange-500/20"
                                >
                                  Review
                                </Link>
                              )}
                              {(upload.status === 'FAILED' || upload.status === 'REJECTED' || upload.status === 'REVIEW_REQUIRED' || upload.status === 'EXTRACTED') && (
                                <button
                                  onClick={() => handleReprocess(upload.id)}
                                  className="px-3 py-1.5 rounded-md border border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04] text-xs font-semibold hover:bg-[#ca8a04]/20"
                                >
                                  Reprocess
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && uploads.length > 0 && totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-3">
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
            </div>
          </div>
        </>
      ) : (
        <IncidentReportsPanel embedded />
      )}
    </div>
  );
}
