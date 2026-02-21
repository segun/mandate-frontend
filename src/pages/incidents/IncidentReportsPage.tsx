import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DEFAULT_PAGE_LIMIT } from '../../lib/api';
import { isRoleAboveStateCoordinator } from '../../lib/permissions';
import { lgasService } from '../../services/lgas.service';
import {
  incidentReportsService,
  type IncidentMediaType,
  type IncidentReport,
} from '../../services/incident-reports.service';
import { pollingUnitsService } from '../../services/polling-units.service';
import { statesService } from '../../services/states.service';
import { wardsService } from '../../services/wards.service';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from '../../stores/toast.store';

const MEDIA_TYPE_OPTIONS: Array<{ label: string; value: IncidentMediaType | '' }> = [
  { label: 'All media', value: '' },
  { label: 'Image', value: 'IMAGE' },
  { label: 'Video', value: 'VIDEO' },
  { label: 'Audio', value: 'AUDIO' },
];

const MAX_FILES_PER_UPLOAD = 20;

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

interface SelectOption {
  id: string;
  name: string;
}

export function IncidentReportsPanel({ embedded = false }: IncidentReportsPanelProps) {
  const { user } = useAuthStore();
  const canViewAllReports = isRoleAboveStateCoordinator(user?.role);
  const canDeleteReports = isRoleAboveStateCoordinator(user?.role);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [stateId, setStateId] = useState('');
  const [lgaId, setLgaId] = useState('');
  const [wardId, setWardId] = useState('');
  const [pollingUnitId, setPollingUnitId] = useState('');

  const [states, setStates] = useState<SelectOption[]>([]);
  const [lgas, setLgas] = useState<SelectOption[]>([]);
  const [wards, setWards] = useState<SelectOption[]>([]);
  const [pollingUnits, setPollingUnits] = useState<SelectOption[]>([]);

  const [isUploading, setIsUploading] = useState(false);

  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isListForbidden, setIsListForbidden] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mediaTypeFilter, setMediaTypeFilter] = useState<IncidentMediaType | ''>('');

  const [reportPendingDelete, setReportPendingDelete] = useState<IncidentReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewLoadFailedIds, setPreviewLoadFailedIds] = useState<Set<string>>(new Set());

  const getPreviewUrl = (report: IncidentReport): string | null => {
    return report.mediaUrl || report.downloadUrl || null;
  };

  const markPreviewFailed = (id: string) => {
    setPreviewLoadFailedIds((current) => {
      if (current.has(id)) {
        return current;
      }
      const next = new Set(current);
      next.add(id);
      return next;
    });
  };

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

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await statesService.getAll(1, DEFAULT_PAGE_LIMIT);
        setStates(
          response.data.data.map((state) => ({
            id: state.id,
            name: state.geoState?.name || 'Unknown',
          })),
        );
      } catch {
        toast.error('Failed to load states');
      }
    };

    loadStates();
  }, []);

  useEffect(() => {
    if (!stateId) {
      setLgas([]);
      setLgaId('');
      setWards([]);
      setWardId('');
      setPollingUnits([]);
      setPollingUnitId('');
      return;
    }

    const loadLgas = async () => {
      try {
        const response = await lgasService.getAll(stateId, 1, DEFAULT_PAGE_LIMIT);
        setLgas(
          response.data.data.map((lga) => ({
            id: lga.id,
            name: lga.geoLga?.name || 'Unknown',
          })),
        );
        setLgaId('');
        setWards([]);
        setWardId('');
        setPollingUnits([]);
        setPollingUnitId('');
      } catch {
        toast.error('Failed to load LGAs');
      }
    };

    loadLgas();
  }, [stateId]);

  useEffect(() => {
    if (!lgaId) {
      setWards([]);
      setWardId('');
      setPollingUnits([]);
      setPollingUnitId('');
      return;
    }

    const loadWards = async () => {
      try {
        const response = await wardsService.getAll(1, DEFAULT_PAGE_LIMIT, lgaId);
        setWards(
          response.data.map((ward) => ({
            id: ward.id,
            name: ward.geoWard?.name || 'Unknown',
          })),
        );
        setWardId('');
        setPollingUnits([]);
        setPollingUnitId('');
      } catch {
        toast.error('Failed to load wards');
      }
    };

    loadWards();
  }, [lgaId]);

  useEffect(() => {
    if (!wardId) {
      setPollingUnits([]);
      setPollingUnitId('');
      return;
    }

    const loadPollingUnits = async () => {
      try {
        const response = await pollingUnitsService.getAll(1, DEFAULT_PAGE_LIMIT, wardId);
        setPollingUnits(
          response.data.map((pollingUnit) => ({
            id: pollingUnit.id,
            name: pollingUnit.geoPollingUnit?.name || pollingUnit.name || 'Unknown',
          })),
        );
        setPollingUnitId('');
      } catch {
        toast.error('Failed to load polling units');
      }
    };

    loadPollingUnits();
  }, [wardId]);

  const handleUpload = async (event: FormEvent) => {
    event.preventDefault();

    if (!selectedFiles.length) {
      toast.error('Please choose at least one media file to upload');
      return;
    }

    if (selectedFiles.length > MAX_FILES_PER_UPLOAD) {
      toast.error(`You can upload a maximum of ${MAX_FILES_PER_UPLOAD} files at once`);
      return;
    }

    if (!stateId || !lgaId || !wardId || !pollingUnitId) {
      toast.error('Please select State, LGA, Ward and Polling Unit');
      return;
    }

    const unsupportedFile = selectedFiles.find((selectedFile) => {
      const mimeType = selectedFile.type;
      return !(mimeType.startsWith('image/') || mimeType.startsWith('video/') || mimeType.startsWith('audio/'));
    });
    if (unsupportedFile) {
      toast.error(`Invalid file type for ${unsupportedFile.name}. Allowed: image/*, video/*, audio/*`);
      return;
    }

    if (description.length > 5000) {
      toast.error('Description cannot exceed 5000 characters');
      return;
    }

    setIsUploading(true);
    try {
      const uploadResult = await incidentReportsService.upload({
        files: selectedFiles,
        stateId,
        lgaId,
        wardId,
        pollingUnitId,
        description: description.trim() || undefined,
      });

      const successfulUploads = uploadResult.meta?.successfulUploads ?? uploadResult.data.length;
      const totalFiles = uploadResult.meta?.totalFiles ?? selectedFiles.length;
      const failedUploads = uploadResult.meta?.failedUploads ?? Math.max(totalFiles - successfulUploads, 0);

      if (successfulUploads > 0 && failedUploads === 0) {
        toast.success(`${successfulUploads} incident report${successfulUploads > 1 ? 's' : ''} uploaded successfully`);
      } else if (successfulUploads > 0) {
        toast.warning(`Uploaded ${successfulUploads}/${totalFiles} incident reports. ${failedUploads} failed.`);
      } else {
        toast.error(uploadResult.message || 'No incident reports were uploaded');
      }

      if (uploadResult.meta?.failed?.length) {
        const failureSummary = uploadResult.meta.failed
          .slice(0, 2)
          .map((failure) => `${failure.fileName}: ${failure.error}`)
          .join(' | ');
        toast.error(
          uploadResult.meta.failed.length > 2
            ? `${failureSummary} | +${uploadResult.meta.failed.length - 2} more failure(s)`
            : failureSummary,
        );
      }

      setSelectedFiles([]);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">
                  State <span className="text-red-400">*</span>
                </label>
                <select
                  value={stateId}
                  onChange={(event) => setStateId(event.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                >
                  <option value="">Select state</option>
                  {states.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">
                  LGA <span className="text-red-400">*</span>
                </label>
                <select
                  value={lgaId}
                  onChange={(event) => setLgaId(event.target.value)}
                  disabled={!stateId}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50 disabled:opacity-60"
                >
                  <option value="">Select LGA</option>
                  {lgas.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">
                  Ward <span className="text-red-400">*</span>
                </label>
                <select
                  value={wardId}
                  onChange={(event) => setWardId(event.target.value)}
                  disabled={!lgaId}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50 disabled:opacity-60"
                >
                  <option value="">Select ward</option>
                  {wards.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#eee] mb-1">
                  Polling Unit <span className="text-red-400">*</span>
                </label>
                <select
                  value={pollingUnitId}
                  onChange={(event) => setPollingUnitId(event.target.value)}
                  disabled={!wardId}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50 disabled:opacity-60"
                >
                  <option value="">Select polling unit</option>
                  {pollingUnits.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
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

            <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*,audio/*"
                onChange={(event) => {
                  const files = Array.from(event.target.files ?? []);
                  if (files.length > MAX_FILES_PER_UPLOAD) {
                    toast.error(`You can upload a maximum of ${MAX_FILES_PER_UPLOAD} files at once`);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                    setSelectedFiles([]);
                    return;
                  }
                  setSelectedFiles(files);
                }}
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
                Choose media file(s)
              </button>
              <div className="w-full md:max-w-md px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white truncate">
                {selectedFiles.length
                  ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
                  : 'No files selected (image/video/audio, up to 20 files)'}
              </div>
              <button
                type="submit"
                disabled={isUploading || !selectedFiles.length || !stateId || !lgaId || !wardId || !pollingUnitId}
                className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Incident(s)'}
              </button>
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
                (() => {
                  const previewUrl = getPreviewUrl(report);
                  const isPreviewFailed = previewLoadFailedIds.has(report.id);
                  const canRenderPreview = !!previewUrl && !isPreviewFailed;

                  return (
                <div
                  key={report.id}
                  className="rounded-xl border border-[#2a2a2e] bg-[#0d0d0f] overflow-hidden h-full flex flex-col"
                >
                  <div className="bg-[#1a1a1d] border-b border-[#2a2a2e] px-4 py-2 flex items-center justify-between gap-2">
                    <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-[#ca8a04]/15 text-[#ca8a04]">
                      {report.mediaType}
                    </span>
                    <span className="text-xs text-[#888]">{new Date(report.datetimeReported).toLocaleString()}</span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col gap-3 min-h-0">
                    {report.mediaType === 'IMAGE' && canRenderPreview ? (
                      <img
                        src={previewUrl}
                        alt={report.sourceFileName}
                        referrerPolicy="no-referrer"
                        onError={() => markPreviewFailed(report.id)}
                        className="w-full h-52 object-cover rounded-lg border border-[#2a2a2e]"
                      />
                    ) : report.mediaType === 'VIDEO' && canRenderPreview ? (
                      <video
                        src={previewUrl}
                        controls
                        onError={() => markPreviewFailed(report.id)}
                        className="w-full h-52 rounded-lg border border-[#2a2a2e] bg-black"
                      />
                    ) : report.mediaType === 'AUDIO' && canRenderPreview ? (
                      <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                        <audio
                          src={previewUrl}
                          controls
                          onError={() => markPreviewFailed(report.id)}
                          className="w-full"
                        />
                      </div>
                    ) : (
                      <div className="rounded-lg border border-[#2a2a2e] bg-[#141417] p-4">
                        <p className="text-xs text-[#888]">Preview unavailable.</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-white font-medium truncate">{report.sourceFileName}</p>
                      <p className="text-xs text-[#888] mt-1">
                        {report.mimeType} • {formatFileSize(report.fileSizeBytes)}
                      </p>
                    </div>

                    <details className="group rounded-lg border border-[#2a2a2e] bg-[#141417]">
                      <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold text-[#ca8a04] flex items-center justify-between">
                        Incident Details
                        <span className="text-[#888] group-open:hidden">Expand</span>
                        <span className="hidden text-[#888] group-open:inline">Collapse</span>
                      </summary>
                      <div className="px-3 pb-3 pt-1 space-y-2 text-xs">
                        <p className="text-[#aaa]">
                          <span className="text-[#888]">Reported by:</span>{' '}
                          {report.reportedBy?.fullName || 'N/A'}
                          {report.reportedBy?.role ? ` (${report.reportedBy.role})` : ''}
                        </p>
                        <p className="text-[#aaa]">
                          <span className="text-[#888]">State:</span> {report.state?.name || 'N/A'}
                        </p>
                        <p className="text-[#aaa]">
                          <span className="text-[#888]">LGA:</span> {report.lga?.name || 'N/A'}
                        </p>
                        <p className="text-[#aaa]">
                          <span className="text-[#888]">Ward:</span> {report.ward?.name || 'N/A'}
                        </p>
                        <p className="text-[#aaa]">
                          <span className="text-[#888]">Polling Unit:</span>{' '}
                          {report.pollingUnit?.name || 'N/A'}
                        </p>
                        <p className="text-[#aaa]">
                          <span className="text-[#888]">Datetime Reported:</span>{' '}
                          {new Date(report.datetimeReported).toLocaleString()}
                        </p>
                        <p className="text-[#aaa] whitespace-pre-wrap">
                          <span className="text-[#888]">Description:</span>{' '}
                          {report.description?.trim() ? report.description : 'No description provided.'}
                        </p>
                      </div>
                    </details>

                    {(previewUrl || canDeleteReports) && (
                      <div className="mt-auto pt-1 flex flex-wrap items-center gap-2">
                        {previewUrl && (
                          <a
                            href={previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex px-3 py-1.5 rounded-md border border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04] text-xs font-semibold hover:bg-[#ca8a04]/20"
                          >
                            Open/Download Media
                          </a>
                        )}

                        {canDeleteReports && (
                          <div className="ml-auto flex justify-end">
                            <button
                              onClick={() => setReportPendingDelete(report)}
                              className="px-3 py-1.5 rounded-md border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold hover:bg-red-500/20"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                  );
                })()
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
