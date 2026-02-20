import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { isRoleAboveStateCoordinator } from '../../lib/permissions';
import {
  incidentReportsService,
  type IncidentMediaType,
  type IncidentReport,
} from '../../services/incident-reports.service';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from '../../stores/toast.store';

const MEDIA_TYPE_OPTIONS: Array<{ label: string; value: IncidentMediaType | '' }> = [
  { label: 'All media', value: '' },
  { label: 'Image', value: 'IMAGE' },
  { label: 'Video', value: 'VIDEO' },
  { label: 'Audio', value: 'AUDIO' },
];

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '—';
  }
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const size = bytes / 1024 ** exponent;
  return `${size.toFixed(size >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function getIncidentMessage(error: unknown, fallback: string): string {
  return (
    (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
    fallback
  );
}

interface IncidentReportsPanelProps {
  embedded?: boolean;
}

export function IncidentReportsPanel({ embedded = false }: IncidentReportsPanelProps) {
  const { user } = useAuthStore();
  const canViewAllReports = isRoleAboveStateCoordinator(user?.role);
  const canDeleteReports = isRoleAboveStateCoordinator(user?.role);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListForbidden, setIsListForbidden] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<IncidentMediaType | ''>('');

  const [reportPendingDelete, setReportPendingDelete] = useState<IncidentReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await incidentReportsService.list({
        page,
        limit: 20,
        mediaType: mediaTypeFilter || undefined,
      });
      setReports(response.data);
      setTotalPages(response.meta.totalPages || 1);
      setIsListForbidden(false);
    } catch (error: unknown) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 403) {
        setReports([]);
        setTotalPages(1);
        setIsListForbidden(true);
      } else {
        toast.error(getIncidentMessage(error, 'Failed to load incident reports'));
        setReports([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [mediaTypeFilter, page]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error('Please choose a media file to upload');
      return;
    }

    const mimeType = selectedFile.type;
    const isSupportedType =
      mimeType.startsWith('image/') || mimeType.startsWith('video/') || mimeType.startsWith('audio/');
    if (!isSupportedType) {
      toast.error('Invalid file type. Allowed: image/*, video/*, audio/*');
      return;
    }

    if (description.length > 5000) {
      toast.error('Description cannot exceed 5000 characters');
      return;
    }

    setIsUploading(true);
    try {
      await incidentReportsService.upload(selectedFile, description.trim() || undefined);
      toast.success('Incident report uploaded successfully');
      setSelectedFile(null);
      setDescription('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPage(1);
      await fetchReports();
    } catch (error: unknown) {
      toast.error(getIncidentMessage(error, 'Failed to upload incident report'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!reportPendingDelete) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await incidentReportsService.delete(reportPendingDelete.id);
      if (response.deleted) {
        toast.success('Incident report deleted successfully');
        setReports((current) => current.filter((report) => report.id !== reportPendingDelete.id));
        setReportPendingDelete(null);
      }
    } catch (error: unknown) {
      toast.error(getIncidentMessage(error, 'Failed to delete incident report'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={embedded ? 'space-y-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6'}>
      {!embedded && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Incident Reports</h1>
            <p className="text-sm text-[#888] mt-1">
              Upload and manage election incident media (image, video, audio).
            </p>
            <p className="text-xs text-[#666] mt-1">
              {canViewAllReports
                ? 'Viewing all tenant incident reports.'
                : 'Viewing your own incident reports.'}
            </p>
          </div>
          <button
            onClick={fetchReports}
            className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
          >
            Refresh
          </button>
        </div>
      )}

      {embedded && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-sm text-[#888]">
            {canViewAllReports
              ? 'Viewing all tenant incident reports.'
              : 'Viewing your own incident reports.'}
          </p>
          <button
            onClick={fetchReports}
            className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
          >
            Refresh
          </button>
        </div>
      )}

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Report an Incident</h2>
        </div>
        <div className="p-4 sm:p-6">
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
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
                Choose media
              </button>
              <div className="w-full md:max-w-md px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white truncate">
                {selectedFile ? selectedFile.name : 'No file selected (image/video/audio)'}
              </div>
              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Incident'}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#eee] mb-1">Description (optional)</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={5000}
                rows={3}
                placeholder="Describe what happened..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
              />
              <p className="text-xs text-[#666] mt-1">{description.length}/5000</p>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Incident Management</h2>
          <select
            value={mediaTypeFilter}
            onChange={(event) => {
              setPage(1);
              setMediaTypeFilter(event.target.value as IncidentMediaType | '');
            }}
            className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
          >
            {MEDIA_TYPE_OPTIONS.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="text-[#888]">Loading incident reports...</div>
          ) : isListForbidden ? (
            <div className="text-[#888]">
              You can upload incident reports, but your role does not have permission to list all reports.
            </div>
          ) : reports.length === 0 ? (
            <div className="text-[#888]">No incident reports found.</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-xl border border-[#2a2a2e] bg-[#0d0d0f] overflow-hidden"
                >
                  <div className="bg-[#1a1a1d] border-b border-[#2a2a2e] px-4 py-2 flex items-center justify-between gap-2">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-[#ca8a04]/15 text-[#ca8a04]">
                      {report.mediaType}
                    </span>
                    <span className="text-xs text-[#888]">{new Date(report.createdAt).toLocaleString()}</span>
                  </div>

                  <div className="p-4 space-y-3">
                    {report.mediaType === 'IMAGE' ? (
                      <img
                        src={report.mediaUrl}
                        alt={report.sourceFileName}
                        className="w-full h-52 object-cover rounded-lg border border-[#2a2a2e]"
                      />
                    ) : report.mediaType === 'VIDEO' ? (
                      <video
                        src={report.mediaUrl}
                        controls
                        className="w-full h-52 rounded-lg border border-[#2a2a2e] bg-black"
                      />
                    ) : (
                      <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                        <audio src={report.mediaUrl} controls className="w-full" />
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-white font-medium truncate">{report.sourceFileName}</p>
                      <p className="text-xs text-[#888] mt-1">
                        {report.mimeType} • {formatFileSize(report.fileSizeBytes)}
                      </p>
                    </div>

                    <p className="text-sm text-[#bbb] whitespace-pre-wrap">
                      {report.description?.trim() ? report.description : 'No description provided.'}
                    </p>

                    {canDeleteReports && (
                      <div className="flex justify-end">
                        <button
                          onClick={() => setReportPendingDelete(report)}
                          className="px-3 py-1.5 rounded-md border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isListForbidden && reports.length > 0 && totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-[#888]">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!reportPendingDelete}
        title="Delete incident report"
        message="This action is permanent and will remove the media object from storage."
        confirmLabel={isDeleting ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        variant="danger"
        onCancel={() => {
          if (!isDeleting) {
            setReportPendingDelete(null);
          }
        }}
        onConfirm={() => {
          if (!isDeleting) {
            void handleDelete();
          }
        }}
      />
    </div>
  );
}

export function IncidentReportsPage() {
  return <IncidentReportsPanel />;
}
