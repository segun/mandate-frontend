import { useEffect, useState } from 'react';

type GeoLevel = 'state' | 'lga' | 'ward' | 'polling-unit';
type UploadStatus = 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

interface UploadJob {
  id: string;
  fileName: string;
  level: GeoLevel;
  status: UploadStatus;
  createdAt: string;
  inserted: number;
  updated: number;
  skipped: number;
  errors: number;
}

export function PlatformGeoUploadPage() {
  const [level, setLevel] = useState<GeoLevel>('state');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobs, setJobs] = useState<UploadJob[]>([]);

  useEffect(() => {
    const pendingJob = jobs.find((job) => job.status === 'QUEUED' || job.status === 'PROCESSING');
    if (!pendingJob) return;

    const timer = setTimeout(() => {
      setJobs((prev) =>
        prev.map((job) => {
          if (job.id !== pendingJob.id) return job;
          if (job.status === 'QUEUED') {
            return { ...job, status: 'PROCESSING' };
          }
          if (job.status === 'PROCESSING') {
            return {
              ...job,
              status: 'COMPLETED',
              inserted: Math.floor(Math.random() * 120) + 20,
              updated: Math.floor(Math.random() * 40),
              skipped: Math.floor(Math.random() * 20),
              errors: Math.floor(Math.random() * 5),
            };
          }
          return job;
        })
      );
    }, 1200);

    return () => clearTimeout(timer);
  }, [jobs]);

  const submitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    const newJob: UploadJob = {
      id: `job-${Date.now()}`,
      fileName: selectedFile.name,
      level,
      status: 'QUEUED',
      createdAt: new Date().toISOString(),
      inserted: 0,
      updated: 0,
      skipped: 0,
      errors: 0,
    };

    setJobs((prev) => [newJob, ...prev]);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Geo CSV Upload</h1>
        <p className="text-sm text-[#888]">Upload CSV files to populate platform geodata entities asynchronously.</p>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden mb-6">
        <form onSubmit={submitUpload} className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#eee] mb-1">Geo level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as GeoLevel)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              >
                <option value="state">State</option>
                <option value="lga">LGA</option>
                <option value="ward">Ward</option>
                <option value="polling-unit">Polling Unit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#eee] mb-1">CSV file</label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
                className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedFile}
            className="px-4 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Upload CSV
          </button>
        </form>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3">
          <h2 className="text-lg font-semibold text-white">Upload Jobs</h2>
        </div>

        {jobs.length === 0 ? (
          <div className="p-10 text-center text-[#888]">No uploads yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#2a2a2e]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Job ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">File</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Level</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Inserted</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Updated</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Skipped</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Errors</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2e]">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-4 py-3 text-sm text-[#bbb]">{job.id}</td>
                    <td className="px-4 py-3 text-sm text-[#ddd]">{job.fileName}</td>
                    <td className="px-4 py-3 text-sm text-[#ddd]">{job.level}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          job.status === 'COMPLETED'
                            ? 'bg-[#ca8a04]/20 text-[#ca8a04]'
                            : job.status === 'FAILED'
                              ? 'bg-red-500/15 text-red-300'
                              : 'bg-[#2a2a2e] text-[#ddd]'
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#bbb]">{job.inserted}</td>
                    <td className="px-4 py-3 text-sm text-[#bbb]">{job.updated}</td>
                    <td className="px-4 py-3 text-sm text-[#bbb]">{job.skipped}</td>
                    <td className="px-4 py-3 text-sm text-[#bbb]">{job.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
