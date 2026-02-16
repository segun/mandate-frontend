import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  disconnectPlatformGeodataImportSocket,
  getPlatformGeodataImportSocket,
} from '../../lib/platformGeodataImportSocket';
import {
  platformGeodataService,
  type GeodataImportDuplicateRow,
  type GeodataImportJob,
} from '../../services/platform-geodata.service';
import { toast } from '../../stores/toast.store';

type ImportJobStatus = GeodataImportJob['status'] | 'queued';

interface ImportStatusProgressPayload {
  jobId: string;
  uploadedByUserId?: string;
  processedRows?: number;
  totalRows?: number;
  skippedRows?: number;
  createdStates?: number;
  createdLgas?: number;
  createdWards?: number;
  createdPollingUnits?: number;
  updatedPollingUnits?: number;
  duplicateRows?: number;
}

interface ImportStatusEventPayload {
  type?: 'progress' | 'queued' | 'processing' | 'completed' | 'failed';
  jobId: string;
  status?: ImportJobStatus;
  at?: string;
  progress?: ImportStatusProgressPayload;
  job?: Partial<GeodataImportJob> & { id: string };
}

function normalizeImportStatus(status?: ImportJobStatus): GeodataImportJob['status'] | undefined {
  if (!status) return undefined;
  if (status === 'queued') return 'pending';
  return status;
}

export function PlatformGeoDataImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [jobs, setJobs] = useState<GeodataImportJob[]>([]);
  const [jobsPage, setJobsPage] = useState(1);
  const [jobsTotalPages, setJobsTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [duplicatesByJobId, setDuplicatesByJobId] = useState<Record<string, GeodataImportDuplicateRow[]>>({});
  const [loadingDuplicatesByJobId, setLoadingDuplicatesByJobId] = useState<Record<string, boolean>>({});
  const [duplicatesErrorByJobId, setDuplicatesErrorByJobId] = useState<Record<string, string>>({});
  const terminalToastShownRef = useRef<Set<string>>(new Set());

  const formatDuplicateRow = (row: GeodataImportDuplicateRow) => {
    if (typeof row === 'string' || typeof row === 'number') {
      return String(row);
    }

    return Object.entries(row)
      .map(([key, value]) => `${key}: ${value === null ? 'null' : String(value)}`)
      .join(' | ');
  };

  const handleLoadDuplicates = async (job: GeodataImportJob) => {
    if (!job.duplicateRowsUrl) {
      setDuplicatesErrorByJobId((prev) => ({ ...prev, [job.id]: 'No duplicate rows URL found for this job.' }));
      return;
    }

    setLoadingDuplicatesByJobId((prev) => ({ ...prev, [job.id]: true }));
    setDuplicatesErrorByJobId((prev) => ({ ...prev, [job.id]: '' }));

    try {
      const duplicateRows = await platformGeodataService.getImportDuplicates(job.duplicateRowsUrl);
      setDuplicatesByJobId((prev) => ({ ...prev, [job.id]: duplicateRows }));
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load duplicate rows';
      setDuplicatesErrorByJobId((prev) => ({ ...prev, [job.id]: message }));
      toast.error(message);
    } finally {
      setLoadingDuplicatesByJobId((prev) => ({ ...prev, [job.id]: false }));
    }
  };

  const fetchJobs = useCallback(async () => {
    setLoadingJobs(true);
    try {
      const response = await platformGeodataService.listImportJobs({
        page: jobsPage,
        limit: 20,
        status: statusFilter || undefined,
      });
      setJobs(response.data);
      setJobsTotalPages(response.meta.totalPages || 1);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to load import jobs';
      toast.error(message);
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  }, [jobsPage, statusFilter]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const socket = getPlatformGeodataImportSocket(accessToken);

    const handleStatus = (payload: ImportStatusEventPayload) => {
      if (!payload?.jobId) {
        return;
      }

      const isProgressPayload = payload.type === 'progress' && !!payload.progress;
      const normalizedStatus = normalizeImportStatus(payload.status ?? (isProgressPayload ? 'processing' : payload.type));

      const patch: Partial<GeodataImportJob> = {
        ...(normalizedStatus ? { status: normalizedStatus } : {}),
      };

      if (isProgressPayload) {
        const progress = payload.progress;
        if (progress?.processedRows !== undefined) patch.processedRows = progress.processedRows;
        if (progress?.skippedRows !== undefined) patch.skippedRows = progress.skippedRows;
        if (progress?.createdStates !== undefined) patch.createdStates = progress.createdStates;
        if (progress?.createdLgas !== undefined) patch.createdLgas = progress.createdLgas;
        if (progress?.createdWards !== undefined) patch.createdWards = progress.createdWards;
        if (progress?.createdPollingUnits !== undefined) patch.createdPollingUnits = progress.createdPollingUnits;
        if (progress?.updatedPollingUnits !== undefined) patch.updatedPollingUnits = progress.updatedPollingUnits;
        if (progress?.duplicateRows !== undefined) patch.duplicateRows = progress.duplicateRows;
      }

      if (payload.job) {
        Object.assign(patch, payload.job);
        patch.status = normalizeImportStatus(payload.job.status as ImportJobStatus | undefined) ?? patch.status;
      }

      setJobs((prev) => {
        let found = false;
        const next = prev.map((job) => {
          if (job.id !== payload.jobId) {
            return job;
          }

          found = true;
          return { ...job, ...patch };
        });

        if (!found && payload.job?.fileName) {
          return [
            {
              id: payload.job.id,
              fileName: payload.job.fileName,
              status: normalizeImportStatus(payload.job.status as ImportJobStatus | undefined) ?? 'pending',
              processedRows: payload.job.processedRows ?? 0,
              skippedRows: payload.job.skippedRows ?? 0,
              createdStates: payload.job.createdStates ?? 0,
              createdLgas: payload.job.createdLgas ?? 0,
              createdWards: payload.job.createdWards ?? 0,
              createdPollingUnits: payload.job.createdPollingUnits ?? 0,
              updatedPollingUnits: payload.job.updatedPollingUnits ?? 0,
              duplicateRows: payload.job.duplicateRows ?? 0,
              duplicateRowsUrl: payload.job.duplicateRowsUrl ?? null,
              errors: payload.job.errors ?? null,
              failureReason: payload.job.failureReason ?? null,
              startedAt: payload.job.startedAt ?? null,
              completedAt: payload.job.completedAt ?? null,
              createdAt: payload.job.createdAt ?? payload.at ?? new Date().toISOString(),
              updatedAt: payload.job.updatedAt ?? payload.at ?? new Date().toISOString(),
              uploadedByUserId: payload.job.uploadedByUserId,
            },
            ...next,
          ];
        }

        return next;
      });

      const isTerminal = normalizedStatus === 'completed' || normalizedStatus === 'failed';
      if (isTerminal && !terminalToastShownRef.current.has(payload.jobId)) {
        terminalToastShownRef.current.add(payload.jobId);
        toast.info(`Import job ${normalizedStatus}`);
        fetchJobs();
      }
    };

    socket.on('imports:status', handleStatus);

    const heartbeat = window.setInterval(() => {
      socket.emit('imports:ping');
    }, 30000);

    return () => {
      window.clearInterval(heartbeat);
      socket.off('imports:status', handleStatus);
      disconnectPlatformGeodataImportSocket();
    };
  }, [fetchJobs]);

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      toast.error('Please select a CSV file');
      return;
    }

    setUploading(true);
    try {
      const job = await platformGeodataService.importCsv(file);
      toast.success('Geodata import job queued successfully');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setJobs((prev) => [job, ...prev]);
      fetchJobs();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to upload CSV';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Geo CSV Imports</h1>
          <p className="text-sm text-[#888] mt-1">Upload geodata CSV files and monitor async import status.</p>
        </div>
        <Link
          to="/platform-owner/geodata"
          className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
        >
          Back to Geo Data
        </Link>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Upload CSV</h2>
        </div>

        <div className="p-4 sm:p-6">
          <form onSubmit={handleUpload} className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
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
              {file ? file.name : 'No file selected'}
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Upload CSV'}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Import Jobs</h2>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setJobsPage(1);
                setStatusFilter(e.target.value);
              }}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
            <button
              type="button"
              onClick={fetchJobs}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white font-semibold hover:bg-[#2a2a2e]"
            >
              Refresh Jobs
            </button>
          </div>

          {loadingJobs ? (
            <div className="text-[#888]">Loading import jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-[#888]">No import jobs found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#2a2a2e]">
                  <tr>
                    <th className="text-left py-2 text-sm text-white">File</th>
                    <th className="text-left py-2 text-sm text-white">Status</th>
                    <th className="text-left py-2 text-sm text-white">Processed</th>
                    <th className="text-left py-2 text-sm text-white">Created PUs</th>
                    <th className="text-left py-2 text-sm text-white">Updated PUs</th>
                    <th className="text-left py-2 text-sm text-white">Duplicates</th>
                    <th className="text-left py-2 text-sm text-white">Errors</th>
                    <th className="text-left py-2 text-sm text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => {
                    const isExpanded = expandedJobId === job.id;
                    const duplicates = duplicatesByJobId[job.id] || [];
                    const isLoadingDuplicates = !!loadingDuplicatesByJobId[job.id];
                    const duplicatesError = duplicatesErrorByJobId[job.id];

                    return (
                      <Fragment key={job.id}>
                        <tr className="border-b border-[#2a2a2e]/60">
                          <td className="py-2 text-sm text-[#ddd]">{job.fileName}</td>
                          <td className="py-2 text-sm text-[#bbb]">{job.status}</td>
                          <td className="py-2 text-sm text-[#bbb]">{job.processedRows}</td>
                          <td className="py-2 text-sm text-[#bbb]">{job.createdPollingUnits}</td>
                          <td className="py-2 text-sm text-[#bbb]">{job.updatedPollingUnits}</td>
                          <td className="py-2 text-sm text-[#bbb]">{job.duplicateRows}</td>
                          <td className="py-2 text-sm text-[#bbb]">{job.errors?.length || 0}</td>
                          <td className="py-2 text-sm text-[#bbb]">
                            <button
                              type="button"
                              onClick={() => setExpandedJobId((current) => (current === job.id ? null : job.id))}
                              className="px-2.5 py-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1d] text-white hover:bg-[#2a2a2e]"
                            >
                              {isExpanded ? 'Hide' : 'View'} details
                            </button>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="border-b border-[#2a2a2e]/60 bg-[#101013]">
                            <td colSpan={8} className="py-3 px-2 sm:px-3">
                              <div className="space-y-3">
                                <div>
                                  <div className="text-sm font-semibold text-white">Errors</div>
                                  {job.errors && job.errors.length > 0 ? (
                                    <ul className="mt-1 list-disc list-inside text-sm text-[#fca5a5] space-y-1">
                                      {job.errors.map((error, index) => (
                                        <li key={`${job.id}-error-${index}`}>{error}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <div className="mt-1 text-sm text-[#888]">No row errors reported for this job.</div>
                                  )}
                                  {job.failureReason && (
                                    <div className="mt-1 text-sm text-[#fca5a5]">Failure reason: {job.failureReason}</div>
                                  )}
                                </div>

                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <div className="text-sm font-semibold text-white">Duplicate Rows</div>
                                    <button
                                      type="button"
                                      onClick={() => handleLoadDuplicates(job)}
                                      disabled={isLoadingDuplicates || job.duplicateRows === 0}
                                      className="px-2.5 py-1.5 rounded-md border border-[#2a2a2e] bg-[#1a1a1d] text-white text-xs font-semibold hover:bg-[#2a2a2e] disabled:opacity-60"
                                    >
                                      {isLoadingDuplicates ? 'Loading...' : 'Load duplicates'}
                                    </button>
                                  </div>

                                  {job.duplicateRows === 0 ? (
                                    <div className="mt-1 text-sm text-[#888]">No duplicates reported for this job.</div>
                                  ) : duplicatesError ? (
                                    <div className="mt-1 text-sm text-[#fca5a5]">{duplicatesError}</div>
                                  ) : duplicates.length > 0 ? (
                                    <div className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] p-2">
                                      <ul className="space-y-1 text-xs text-[#ddd]">
                                        {duplicates.map((row, index) => (
                                          <li key={`${job.id}-duplicate-${index}`}>{formatDuplicateRow(row)}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  ) : (
                                    <div className="mt-1 text-sm text-[#888]">Click “Load duplicates” to fetch duplicate rows.</div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loadingJobs && jobs.length > 0 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setJobsPage((p) => Math.max(1, p - 1))}
                disabled={jobsPage === 1}
                className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-[#888]">
                Page {jobsPage} of {jobsTotalPages}
              </span>
              <button
                onClick={() => setJobsPage((p) => Math.min(jobsTotalPages, p + 1))}
                disabled={jobsPage === jobsTotalPages}
                className="px-3 py-1.5 text-sm border border-[#2a2a2e] rounded-md text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
