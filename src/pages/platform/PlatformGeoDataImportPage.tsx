import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { platformGeodataService, type GeodataImportJob } from '../../services/platform-geodata.service';
import { toast } from '../../stores/toast.store';

export function PlatformGeoDataImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [jobs, setJobs] = useState<GeodataImportJob[]>([]);
  const [jobsPage, setJobsPage] = useState(1);
  const [jobsTotalPages, setJobsTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

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
    if (!activeJobId) return;

    const timer = setInterval(async () => {
      try {
        const job = await platformGeodataService.getImportJob(activeJobId);
        setJobs((prev) => prev.map((item) => (item.id === job.id ? { ...item, ...job } : item)));

        if (job.status === 'completed' || job.status === 'failed') {
          setActiveJobId(null);
          fetchJobs();
          toast.info(`Import job ${job.status}`);
        }
      } catch {
        setActiveJobId(null);
      }
    }, 1500);

    return () => clearInterval(timer);
  }, [activeJobId, fetchJobs]);

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
      setJobs((prev) => [job, ...prev]);
      setActiveJobId(job.id);
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
              type="file"
              accept=".csv"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full md:max-w-md px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
            />
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
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-[#2a2a2e]/60">
                      <td className="py-2 text-sm text-[#ddd]">{job.fileName}</td>
                      <td className="py-2 text-sm text-[#bbb]">{job.status}</td>
                      <td className="py-2 text-sm text-[#bbb]">{job.processedRows}</td>
                      <td className="py-2 text-sm text-[#bbb]">{job.createdPollingUnits}</td>
                      <td className="py-2 text-sm text-[#bbb]">{job.updatedPollingUnits}</td>
                      <td className="py-2 text-sm text-[#bbb]">{job.duplicateRows}</td>
                      <td className="py-2 text-sm text-[#bbb]">{job.errors?.length || 0}</td>
                    </tr>
                  ))}
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
