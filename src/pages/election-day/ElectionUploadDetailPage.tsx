import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  electionResultsService,
  type ElectionUpload,
  type ElectionUploadStatus,
  type CorrectPayload,
  type PartyVote,
  TERMINAL_STATUSES,
} from '../../services/election-results.service';
import {
  getElectionResultsSocket,
  disconnectElectionResultsSocket,
} from '../../lib/electionResultsSocket';
import { pollingUnitsService, type PollingUnit } from '../../services/polling-units.service';
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

type ReviewTab = 'extracted' | 'approve' | 'correct' | 'reject' | 'file';

export function ElectionUploadDetailPage() {
  const { eventId, uploadId } = useParams<{ eventId: string; uploadId: string }>();

  const [upload, setUpload] = useState<ElectionUpload | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ReviewTab>('extracted');

  // Approve form
  const [approvePollingUnitId, setApprovePollingUnitId] = useState('');
  const [approving, setApproving] = useState(false);

  // Reject form
  const [rejectReason, setRejectReason] = useState('');
  const [rejecting, setRejecting] = useState(false);

  // Correct form
  const [correctForm, setCorrectForm] = useState<CorrectPayload>({
    pollingUnitId: '',
    electionType: '',
    votersRegistered: 0,
    votersAccredited: 0,
    validVotes: 0,
    rejectedVotes: 0,
    partyVotes: [],
  });
  const [correcting, setCorrecting] = useState(false);
  const [isCorrectEditorOpen, setIsCorrectEditorOpen] = useState(false);

  // Polling unit search (optional override for approve/correct)
  const [showPuSearch, setShowPuSearch] = useState(false);
  const [puQuery, setPuQuery] = useState('');
  const [puResults, setPuResults] = useState<PollingUnit[]>([]);
  const [puSearching, setPuSearching] = useState(false);
  const [selectedPuName, setSelectedPuName] = useState('');

  // File preview controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePreviewError, setImagePreviewError] = useState(false);

  // Seed forms from extracted data when available
  useEffect(() => {
    if (!upload?.extractedData) return;
    const ed = upload.extractedData;

    setCorrectForm({
      pollingUnitId: upload.pollingUnitId || '',
      electionType: ed.electionType || '',
      votersRegistered: ed.votersRegistered || 0,
      votersAccredited: ed.votersAccredited || 0,
      validVotes: ed.validVotes || 0,
      rejectedVotes: ed.rejectedVotes || 0,
      partyVotes: ed.partyVotes?.length
        ? ed.partyVotes.map((pv) => ({ ...pv }))
        : [{ partyName: '', votesScored: 0 }],
    });

    if (upload.pollingUnitId) {
      setApprovePollingUnitId(upload.pollingUnitId);
      setSelectedPuName(upload.geoPollingUnit?.name || upload.pollingUnitId);
    }
  }, [upload?.extractedData, upload?.pollingUnitId, upload?.geoPollingUnit?.name]);

  const fetchUpload = useCallback(async () => {
    if (!uploadId) return;
    setLoading(true);
    try {
      const data = await electionResultsService.getUpload(uploadId);
      setUpload(data);
    } catch {
      toast.error('Failed to load upload details');
    } finally {
      setLoading(false);
    }
  }, [uploadId]);

  useEffect(() => {
    fetchUpload();
  }, [fetchUpload]);

  useEffect(() => {
    setZoomLevel(1);
  }, [upload?.id]);

  useEffect(() => {
    setImagePreviewError(false);
  }, [upload?.id, upload?.downloadUrl]);

  // WebSocket live updates
  useEffect(() => {
    if (!uploadId) return;
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const socket = getElectionResultsSocket(accessToken);
    socket.emit('upload:subscribe', { uploadId });

    const handleStatus = (payload: Partial<ElectionUpload> & { id: string }) => {
      if (payload.id === uploadId) {
        setUpload((prev) => (prev ? { ...prev, ...payload } : prev));
        if (payload.status && TERMINAL_STATUSES.includes(payload.status)) {
          if (payload.status === 'REVIEW_REQUIRED') toast.warning('This upload needs review');
          else if (payload.status === 'EXTRACTED') toast.success('Extraction completed');
          else if (payload.status === 'FAILED') toast.error('Processing failed');
          fetchUpload();
        }
      }
    };

    socket.on('upload:status', handleStatus);

    return () => {
      socket.emit('upload:unsubscribe', { uploadId });
      socket.off('upload:status', handleStatus);
      disconnectElectionResultsSocket();
    };
  }, [uploadId, fetchUpload]);

  // Polling unit search
  const handlePuSearch = async () => {
    if (!puQuery.trim()) return;
    setPuSearching(true);
    try {
      const response = await pollingUnitsService.search(puQuery, 1, 10);
      setPuResults(response.data);
    } catch {
      toast.error('Failed to search polling units');
    } finally {
      setPuSearching(false);
    }
  };

  const selectPollingUnit = (pu: PollingUnit) => {
    const puName = pu.geoPollingUnit?.name || pu.name || pu.id;
    if (activeTab === 'approve') {
      setApprovePollingUnitId(pu.id);
    } else if (activeTab === 'correct') {
      setCorrectForm((prev) => ({ ...prev, pollingUnitId: pu.id }));
    }
    setSelectedPuName(puName);
    setPuQuery('');
    setPuResults([]);
    setShowPuSearch(false);
  };

  // Actions
  const handleApprove = async () => {
    if (!uploadId || !approvePollingUnitId) {
      toast.error('Polling unit ID is required to approve');
      return;
    }
    setApproving(true);
    try {
      const updated = await electionResultsService.approve(uploadId, approvePollingUnitId);
      setUpload(updated);
      toast.success('Upload approved');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to approve';
      toast.error(message);
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async () => {
    if (!uploadId || !rejectReason.trim()) {
      toast.error('Please provide a reason');
      return;
    }
    setRejecting(true);
    try {
      const updated = await electionResultsService.reject(uploadId, rejectReason);
      setUpload(updated);
      toast.success('Upload rejected');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to reject';
      toast.error(message);
    } finally {
      setRejecting(false);
    }
  };

  const handleCorrect = async () => {
    if (!uploadId) return;
    if (!correctForm.pollingUnitId) {
      toast.error('Polling unit ID is required');
      return;
    }
    if (correctForm.partyVotes.some((pv) => !pv.partyName.trim())) {
      toast.error('Please fill in all party names');
      return;
    }
    setCorrecting(true);
    try {
      const updated = await electionResultsService.correct(uploadId, correctForm);
      setUpload(updated);
      setIsCorrectEditorOpen(false);
      toast.success('Correction submitted and confirmed');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to submit correction';
      toast.error(message);
    } finally {
      setCorrecting(false);
    }
  };

  const handleReprocess = async () => {
    if (!uploadId) return;
    try {
      const updated = await electionResultsService.reprocess(uploadId);
      setUpload(updated);
      toast.success('Reprocessing started');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Failed to reprocess';
      toast.error(message);
    }
  };

  // Party votes helpers
  const addPartyVote = () => {
    setCorrectForm((prev) => ({
      ...prev,
      partyVotes: [...prev.partyVotes, { partyName: '', votesScored: 0 }],
    }));
  };

  const removePartyVote = (index: number) => {
    setCorrectForm((prev) => ({
      ...prev,
      partyVotes: prev.partyVotes.filter((_, i) => i !== index),
    }));
  };

  const updatePartyVote = (index: number, field: keyof PartyVote, value: string | number) => {
    setCorrectForm((prev) => ({
      ...prev,
      partyVotes: prev.partyVotes.map((pv, i) =>
        i === index ? { ...pv, [field]: value } : pv,
      ),
    }));
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-[#888]">Loading upload details...</div>
    );
  }

  if (!upload) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center text-[#888]">Upload not found.</div>
    );
  }

  const ed = upload.extractedData;
  const ev = upload.extractionValidation;
  const geoPu = upload.geoPollingUnit;
  const fileUrl = upload.downloadUrl || null;
  const isImageFile = upload.mimeType?.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(upload.sourceFileName);
  const isPdfFile = upload.mimeType === 'application/pdf' || /\.pdf$/i.test(upload.sourceFileName);
  const canPreviewImage = !!fileUrl && !!isImageFile && !imagePreviewError;
  const canPreviewPdf = !!fileUrl && !!isPdfFile;
  const location = {
    stateName: geoPu?.geoState?.name || ed?.stateName,
    lgaName: geoPu?.geoLga?.name || ed?.lgaName,
    wardName: geoPu?.geoWard?.name || ed?.wardName,
    puName: geoPu?.name || ed?.puName,
    stateCode: ed?.stateCode,
    lgaCode: ed?.lgaCode,
    wardCode: ed?.wardCode,
    puCode: geoPu?.code || ed?.puCode,
  };
  const hasExtractedData = !!ed;
  const isReviewable = upload.status === 'REVIEW_REQUIRED' || upload.status === 'EXTRACTED';
  const isReprocessable = upload.status === 'FAILED' || upload.status === 'REJECTED' || upload.status === 'REVIEW_REQUIRED' || upload.status === 'EXTRACTED';
  const isProcessing = upload.status === 'PENDING' || upload.status === 'PROCESSING';

  const renderFilePreview = (
    heightClass = 'h-[520px]',
    options?: { fitImage?: boolean },
  ) => {
    const fitImage = options?.fitImage ?? false;

    return (
    <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
      <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Uploaded File</h2>
          <p className="text-xs text-[#888] mt-0.5">{upload.sourceFileName}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {canPreviewImage && (
            <>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                className="px-2.5 py-1.5 rounded border border-[#2a2a2e] bg-[#0d0d0f] text-xs text-white hover:bg-[#2a2a2e]"
              >
                -
              </button>
              <span className="text-xs text-[#bbb] w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(4, z + 0.25))}
                className="px-2.5 py-1.5 rounded border border-[#2a2a2e] bg-[#0d0d0f] text-xs text-white hover:bg-[#2a2a2e]"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="px-2.5 py-1.5 rounded border border-[#2a2a2e] bg-[#0d0d0f] text-xs text-white hover:bg-[#2a2a2e]"
              >
                Reset
              </button>
            </>
          )}
          {fileUrl && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="px-2.5 py-1.5 rounded border border-[#ca8a04]/40 bg-[#ca8a04]/10 text-xs text-[#ca8a04] font-semibold hover:bg-[#ca8a04]/20"
            >
              Open/Download
            </a>
          )}
        </div>
      </div>

      <div className={`${heightClass} bg-[#0d0d0f]`}>
        {canPreviewImage && fileUrl ? (
          <div className={fitImage ? 'w-full h-full overflow-auto p-3 flex items-center justify-center' : 'w-full h-full overflow-auto p-3'}>
            <img
              src={fileUrl}
              alt={upload.sourceFileName}
              referrerPolicy="no-referrer"
              onError={() => setImagePreviewError(true)}
              style={fitImage ? {
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              } : {
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top left',
              }}
              className={fitImage ? 'block max-w-full max-h-full object-contain' : 'block max-w-none'}
            />
          </div>
        ) : canPreviewPdf && fileUrl ? (
          <div className="w-full h-full">
            <iframe
              src={fileUrl}
              title={upload.sourceFileName}
              className="w-full h-full bg-white"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center px-4">
            <div>
              <p className="text-sm text-[#bbb]">Preview unavailable for this file.</p>
              {fileUrl ? (
                <>
                  {isImageFile && imagePreviewError && (
                    <p className="mt-2 text-xs text-yellow-300">
                      Inline image preview failed. This may be a referrer/hotlink restriction.
                    </p>
                  )}
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm text-[#ca8a04] hover:underline"
                  >
                    Open file in new tab
                  </a>
                </>
              ) : (
                <p className="mt-2 text-xs text-[#666]">No download URL returned by API.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  };

  const pollingUnitSearchBlock = (
    <div className="mt-4 p-3 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f]/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-[#888] uppercase tracking-wide">Override Polling Unit</span>
        <button
          type="button"
          onClick={() => { setShowPuSearch(!showPuSearch); setPuResults([]); setPuQuery(''); }}
          className="text-xs text-[#ca8a04] hover:underline"
        >
          {showPuSearch ? 'Cancel' : 'Search & Override'}
        </button>
      </div>
      {showPuSearch && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={puQuery}
              onChange={(e) => setPuQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handlePuSearch())}
              placeholder="Search by name or code..."
              className="flex-1 px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white placeholder-[#555] text-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
            />
            <button
              type="button"
              onClick={handlePuSearch}
              disabled={puSearching}
              className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e] disabled:opacity-50"
            >
              {puSearching ? '...' : 'Search'}
            </button>
          </div>
          {puResults.length > 0 && (
            <div className="max-h-32 overflow-y-auto rounded-lg border border-[#2a2a2e] bg-[#0d0d0f]">
              {puResults.map((pu) => (
                <button
                  key={pu.id}
                  onClick={() => selectPollingUnit(pu)}
                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#1a1a1d] border-b border-[#2a2a2e]/50 last:border-b-0"
                >
                  <span className="font-medium">{pu.geoPollingUnit?.name || pu.name || 'N/A'}</span>
                  {pu.geoPollingUnit?.code && (
                    <span className="ml-2 text-[#888]">({pu.geoPollingUnit.code})</span>
                  )}
                </button>
              ))}
            </div>
          )}
          {selectedPuName && (
            <p className="text-xs text-green-400">Selected: {selectedPuName}</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#ca8a04]">Upload Detail</h1>
          <p className="text-sm text-[#888] mt-1">{upload.sourceFileName}</p>
        </div>
        <div className="flex gap-2">
          {isReprocessable && (
            <button
              onClick={handleReprocess}
              className="px-3 py-2 rounded-lg border border-[#ca8a04]/30 bg-[#ca8a04]/10 text-[#ca8a04] text-sm font-semibold hover:bg-[#ca8a04]/20"
            >
              Reprocess
            </button>
          )}
          <Link
            to={`/election-day/${eventId}/uploads`}
            className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#1a1a1d] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
          >
            Back to Uploads
          </Link>
        </div>
      </div>

      <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
        <div className="px-4 sm:px-6 py-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#888] uppercase tracking-wide">Status</span>
            <span
              className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                STATUS_STYLES[upload.status] || 'bg-[#2a2a2e] text-[#bbb]'
              }`}
            >
              {upload.status.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#888] uppercase tracking-wide">Confidence</span>
            <span className="text-sm text-white font-medium">
              {upload.overallConfidence != null
                ? `${(upload.overallConfidence * 100).toFixed(1)}%`
                : '—'}
            </span>
          </div>
          {upload.extractionEngine && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#888] uppercase tracking-wide">Engine</span>
              <span className="text-sm text-white font-medium">{upload.extractionEngine}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#888] uppercase tracking-wide">Processed</span>
            <span className="text-sm text-white">
              {upload.processedAt ? new Date(upload.processedAt).toLocaleString() : '—'}
            </span>
          </div>
        </div>

        {isProcessing && (
          <div className="px-4 sm:px-6 pb-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="h-5 w-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-blue-300">
                {upload.status === 'PENDING' ? 'Queued for processing...' : 'Processing extraction...'}
              </p>
            </div>
          </div>
        )}

        {upload.failureReason && (
          <div className="px-4 sm:px-6 pb-4">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-200">{upload.failureReason}</p>
            </div>
          </div>
        )}

        {ev && (ev.warnings.length > 0 || ev.errors.length > 0) && (
          <div className="px-4 sm:px-6 pb-4">
            {ev.errors.length > 0 && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-2">
                <p className="text-xs text-red-400 font-semibold uppercase mb-1">Validation Errors</p>
                <ul className="list-disc list-inside text-sm text-red-200 space-y-0.5">
                  {ev.errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              </div>
            )}
            {ev.warnings.length > 0 && (
              <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <p className="text-xs text-yellow-400 font-semibold uppercase mb-1">Validation Warnings</p>
                <ul className="list-disc list-inside text-sm text-yellow-200 space-y-0.5">
                  {ev.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {hasExtractedData && (
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden">
          <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-0 flex gap-0 overflow-x-auto">
            {(
              isReviewable
                ? (['extracted', 'approve', 'correct', 'reject', 'file'] as ReviewTab[])
                : (['extracted'] as ReviewTab[])
            ).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-[#ca8a04] text-[#ca8a04]'
                    : 'border-transparent text-[#888] hover:text-white'
                }`}
              >
                {tab === 'extracted'
                  ? 'Extracted Data'
                  : tab === 'file'
                    ? 'Uploaded File'
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'extracted' && ed && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-[#ca8a04] uppercase tracking-wide mb-3">Location</h3>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'State', value: location.stateName, sub: location.stateCode },
                      { label: 'LGA', value: location.lgaName, sub: location.lgaCode },
                      { label: 'Ward', value: location.wardName, sub: location.wardCode },
                      { label: 'Polling Unit', value: location.puName, sub: location.puCode },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-[#0d0d0f] border border-[#2a2a2e]">
                        <dt className="text-xs text-[#888]">{item.label}</dt>
                        <dd className="text-sm text-white font-medium mt-0.5">{item.value || '—'}</dd>
                        {item.sub && <dd className="text-xs text-[#666] mt-0.5">{item.sub}</dd>}
                      </div>
                    ))}
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#ca8a04] uppercase tracking-wide mb-3">Election Info</h3>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-[#0d0d0f] border border-[#2a2a2e]">
                      <dt className="text-xs text-[#888]">Election Type</dt>
                      <dd className="text-sm text-white font-medium mt-0.5">{ed.electionType || '—'}</dd>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0d0d0f] border border-[#2a2a2e]">
                      <dt className="text-xs text-[#888]">Presiding Officer</dt>
                      <dd className="text-sm text-white font-medium mt-0.5">{ed.presidingOfficerName || '—'}</dd>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0d0d0f] border border-[#2a2a2e]">
                      <dt className="text-xs text-[#888]">Date Signed</dt>
                      <dd className="text-sm text-white font-medium mt-0.5">{ed.dateSigned || '—'}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#ca8a04] uppercase tracking-wide mb-3">Vote Summary</h3>
                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: 'Voters Registered', value: ed.votersRegistered },
                      { label: 'Voters Accredited', value: ed.votersAccredited },
                      { label: 'Valid Votes', value: ed.validVotes },
                      { label: 'Rejected Votes', value: ed.rejectedVotes },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-lg bg-[#0d0d0f] border border-[#2a2a2e]">
                        <dt className="text-xs text-[#888]">{item.label}</dt>
                        <dd className="text-lg text-white font-bold mt-0.5">
                          {item.value != null ? item.value.toLocaleString() : '—'}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {ed.partyVotes && ed.partyVotes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-[#ca8a04] uppercase tracking-wide mb-3">Party Results</h3>
                    <div className="overflow-x-auto rounded-lg border border-[#2a2a2e]">
                      <table className="w-full">
                        <thead className="border-b border-[#2a2a2e] bg-[#0d0d0f]">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-semibold text-[#888] uppercase">Party</th>
                            <th className="px-4 py-2 text-right text-xs font-semibold text-[#888] uppercase">Votes</th>
                            <th className="px-4 py-2 text-right text-xs font-semibold text-[#888] uppercase">%</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2a2a2e]/50">
                          {ed.partyVotes
                            .slice()
                            .sort((a, b) => b.votesScored - a.votesScored)
                            .map((pv) => {
                              const totalValid = ed.validVotes || 1;
                              const pct = ((pv.votesScored / totalValid) * 100).toFixed(1);
                              const topScore = Math.max(...(ed.partyVotes?.map((p) => p.votesScored) || [0]));
                              const isWinner = pv.votesScored === topScore && pv.votesScored > 0;
                              return (
                                <tr key={pv.partyName} className={isWinner ? 'bg-[#ca8a04]/5' : ''}>
                                  <td className="px-4 py-2 text-sm text-white font-medium">
                                    {pv.partyName}
                                    {isWinner && <span className="ml-2 text-xs text-[#ca8a04]">★</span>}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-white font-mono">
                                    {pv.votesScored.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-[#bbb] font-mono">
                                    {pv.votesScored > 0 ? `${pct}%` : '—'}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                        <tfoot className="border-t border-[#2a2a2e] bg-[#0d0d0f]">
                          <tr>
                            <td className="px-4 py-2 text-sm font-semibold text-white">Total</td>
                            <td className="px-4 py-2 text-sm text-right font-semibold text-white font-mono">
                              {ed.partyVotes.reduce((s, pv) => s + pv.votesScored, 0).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 text-sm text-right text-[#bbb]" />
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'approve' && ed && (
              <div className="space-y-4">
                <p className="text-sm text-[#bbb]">
                  Review the extracted data above. If everything looks correct, approve this upload.
                </p>

                <div className="p-4 rounded-lg bg-[#0d0d0f] border border-[#2a2a2e] space-y-2">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    <div><span className="text-[#888]">Location:</span> <span className="text-white">{location.stateName || '—'} → {location.lgaName || '—'} → {location.wardName || '—'} → {location.puName || '—'}</span></div>
                    <div><span className="text-[#888]">Type:</span> <span className="text-white">{ed.electionType}</span></div>
                    <div><span className="text-[#888]">Valid Votes:</span> <span className="text-white">{ed.validVotes?.toLocaleString()}</span></div>
                  </div>
                  {ed.partyVotes && ed.partyVotes.filter((pv) => pv.votesScored > 0).length > 0 && (
                    <div className="text-sm">
                      <span className="text-[#888]">Top Parties: </span>
                      <span className="text-white">
                        {ed.partyVotes
                          .filter((pv) => pv.votesScored > 0)
                          .sort((a, b) => b.votesScored - a.votesScored)
                          .slice(0, 5)
                          .map((pv) => `${pv.partyName} (${pv.votesScored})`)
                          .join(', ')}
                      </span>
                    </div>
                  )}
                </div>

                {pollingUnitSearchBlock}

                <button
                  onClick={handleApprove}
                  disabled={approving || !approvePollingUnitId}
                  className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-semibold shadow-sm hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {approving ? 'Approving...' : 'Approve & Confirm'}
                </button>
                {!approvePollingUnitId && (
                  <p className="text-xs text-orange-400 mt-1">
                    A polling unit must be assigned. Use "Search & Override" above to select one.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'correct' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                  {renderFilePreview('h-[640px]')}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-[#bbb]">
                        The extracted values are pre-filled below. Edit any incorrect values before confirming.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsCorrectEditorOpen(true)}
                        className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-[#ca8a04] hover:bg-[#2a2a2e]"
                        title="Open full-page editor"
                        aria-label="Open full-page editor"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#eee] mb-1">Election Type</label>
                        <input
                          type="text"
                          value={correctForm.electionType}
                          onChange={(e) => setCorrectForm({ ...correctForm, electionType: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#eee] mb-1">Assigned Polling Unit</label>
                        <input
                          type="text"
                          readOnly
                          value={location.puName || correctForm.pollingUnitId || '(not assigned)'}
                          className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-[#bbb]"
                        />
                        {correctForm.pollingUnitId && (
                          <p className="text-xs text-[#666] mt-1 break-all">
                            ID: {correctForm.pollingUnitId}
                          </p>
                        )}
                        {(location.wardName || location.lgaName || location.stateName) && (
                          <p className="text-xs text-[#888] mt-1">
                            {location.wardName || '—'} • {location.lgaName || '—'} • {location.stateName || '—'}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#eee] mb-1">Voters Registered</label>
                        <input
                          type="number"
                          min={0}
                          value={correctForm.votersRegistered}
                          onChange={(e) =>
                            setCorrectForm({ ...correctForm, votersRegistered: parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#eee] mb-1">Voters Accredited</label>
                        <input
                          type="number"
                          min={0}
                          value={correctForm.votersAccredited}
                          onChange={(e) =>
                            setCorrectForm({ ...correctForm, votersAccredited: parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#eee] mb-1">Valid Votes</label>
                        <input
                          type="number"
                          min={0}
                          value={correctForm.validVotes}
                          onChange={(e) =>
                            setCorrectForm({ ...correctForm, validVotes: parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#eee] mb-1">Rejected Votes</label>
                        <input
                          type="number"
                          min={0}
                          value={correctForm.rejectedVotes}
                          onChange={(e) =>
                            setCorrectForm({ ...correctForm, rejectedVotes: parseInt(e.target.value) || 0 })
                          }
                          className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-[#eee]">Party Votes</label>
                        <button
                          type="button"
                          onClick={addPartyVote}
                          className="px-3 py-1 rounded-md border border-[#2a2a2e] bg-[#1a1a1d] text-white text-xs font-semibold hover:bg-[#2a2a2e]"
                        >
                          + Add Party
                        </button>
                      </div>
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {correctForm.partyVotes.map((pv, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={pv.partyName}
                              onChange={(e) => updatePartyVote(index, 'partyName', e.target.value)}
                              placeholder="Party name"
                              className="flex-1 px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white placeholder-[#555] text-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                            />
                            <input
                              type="number"
                              min={0}
                              value={pv.votesScored}
                              onChange={(e) =>
                                updatePartyVote(index, 'votesScored', parseInt(e.target.value) || 0)
                              }
                              placeholder="Votes"
                              className="w-28 px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                            />
                            {correctForm.partyVotes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removePartyVote(index)}
                                className="px-2 py-2 text-red-400 hover:text-red-300"
                                title="Remove party"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {pollingUnitSearchBlock}

                    <button
                      onClick={handleCorrect}
                      disabled={correcting || !correctForm.pollingUnitId}
                      className="px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {correcting ? 'Submitting...' : 'Submit Correction & Confirm'}
                    </button>
                    {!correctForm.pollingUnitId && (
                      <p className="text-xs text-orange-400 mt-1">
                        A polling unit must be assigned. Use "Search & Override" above to select one.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reject' && (
              <div className="space-y-4">
                <p className="text-sm text-[#bbb]">
                  Reject this upload if the image or extracted data is unusable.
                </p>
                <div>
                  <label className="block text-sm font-medium text-[#eee] mb-1">
                    Reason <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={3}
                    placeholder="e.g. Image unreadable, wrong form type, data doesn't match..."
                    className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white placeholder-[#555] focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50 resize-none"
                  />
                </div>
                <button
                  onClick={handleReject}
                  disabled={rejecting || !rejectReason.trim()}
                  className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold shadow-sm hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {rejecting ? 'Rejecting...' : 'Reject Upload'}
                </button>
              </div>
            )}

            {activeTab === 'file' && (
              <div className="space-y-4">
                {renderFilePreview('h-[640px]')}
              </div>
            )}
          </div>
        </div>
      )}

      {!hasExtractedData && !isProcessing && upload.status !== 'PENDING' && (
        <div className="bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] p-6 text-center text-[#888]">
          No extracted data available for this upload.
        </div>
      )}

      {isCorrectEditorOpen && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm">
          <div className="h-full w-full overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="w-full max-w-6xl max-h-[92vh] bg-[#141417] rounded-2xl shadow-lg border border-[#2a2a2e] overflow-hidden flex flex-col">
                <div className="border-b border-[#2a2a2e] bg-[#1a1a1d] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">Edit Correction</h2>
                    <p className="text-xs text-[#888] mt-0.5">{upload.sourceFileName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCorrectEditorOpen(false)}
                    className="px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white text-sm font-semibold hover:bg-[#2a2a2e]"
                  >
                    Close
                  </button>
                </div>

                <div className="p-4 sm:p-6 h-full overflow-hidden">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full items-start">
                    {renderFilePreview('h-[72vh]', { fitImage: true })}

                    <div className="space-y-4 overflow-y-auto pr-1 max-h-[72vh]">
                      <p className="text-sm text-[#bbb]">
                        The extracted values are pre-filled below. Edit any incorrect values before confirming.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#eee] mb-1">Election Type</label>
                          <input
                            type="text"
                            value={correctForm.electionType}
                            onChange={(e) => setCorrectForm({ ...correctForm, electionType: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#eee] mb-1">Assigned Polling Unit</label>
                          <input
                            type="text"
                            readOnly
                            value={location.puName || correctForm.pollingUnitId || '(not assigned)'}
                            className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-[#bbb]"
                          />
                          {correctForm.pollingUnitId && (
                            <p className="text-xs text-[#666] mt-1 break-all">
                              ID: {correctForm.pollingUnitId}
                            </p>
                          )}
                          {(location.wardName || location.lgaName || location.stateName) && (
                            <p className="text-xs text-[#888] mt-1">
                              {location.wardName || '—'} • {location.lgaName || '—'} • {location.stateName || '—'}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#eee] mb-1">Voters Registered</label>
                          <input
                            type="number"
                            min={0}
                            value={correctForm.votersRegistered}
                            onChange={(e) =>
                              setCorrectForm({ ...correctForm, votersRegistered: parseInt(e.target.value) || 0 })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#eee] mb-1">Voters Accredited</label>
                          <input
                            type="number"
                            min={0}
                            value={correctForm.votersAccredited}
                            onChange={(e) =>
                              setCorrectForm({ ...correctForm, votersAccredited: parseInt(e.target.value) || 0 })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#eee] mb-1">Valid Votes</label>
                          <input
                            type="number"
                            min={0}
                            value={correctForm.validVotes}
                            onChange={(e) =>
                              setCorrectForm({ ...correctForm, validVotes: parseInt(e.target.value) || 0 })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#eee] mb-1">Rejected Votes</label>
                          <input
                            type="number"
                            min={0}
                            value={correctForm.rejectedVotes}
                            onChange={(e) =>
                              setCorrectForm({ ...correctForm, rejectedVotes: parseInt(e.target.value) || 0 })
                            }
                            className="w-full px-4 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-[#eee]">Party Votes</label>
                          <button
                            type="button"
                            onClick={addPartyVote}
                            className="px-3 py-1 rounded-md border border-[#2a2a2e] bg-[#1a1a1d] text-white text-xs font-semibold hover:bg-[#2a2a2e]"
                          >
                            + Add Party
                          </button>
                        </div>
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {correctForm.partyVotes.map((pv, index) => (
                            <div key={index} className="flex gap-2 items-center">
                              <input
                                type="text"
                                value={pv.partyName}
                                onChange={(e) => updatePartyVote(index, 'partyName', e.target.value)}
                                placeholder="Party name"
                                className="flex-1 px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white placeholder-[#555] text-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                              />
                              <input
                                type="number"
                                min={0}
                                value={pv.votesScored}
                                onChange={(e) =>
                                  updatePartyVote(index, 'votesScored', parseInt(e.target.value) || 0)
                                }
                                placeholder="Votes"
                                className="w-28 px-3 py-2 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#ca8a04]/50"
                              />
                              {correctForm.partyVotes.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removePartyVote(index)}
                                  className="px-2 py-2 text-red-400 hover:text-red-300"
                                  title="Remove party"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {pollingUnitSearchBlock}

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={handleCorrect}
                          disabled={correcting || !correctForm.pollingUnitId}
                          className="px-5 py-2.5 rounded-lg bg-[#ca8a04] text-[#0d0d0f] font-semibold shadow-sm hover:bg-[#d4940a] disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {correcting ? 'Submitting...' : 'Submit Correction & Confirm'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsCorrectEditorOpen(false)}
                          className="px-5 py-2.5 rounded-lg border border-[#2a2a2e] bg-[#0d0d0f] text-white font-semibold hover:bg-[#2a2a2e]"
                        >
                          Cancel
                        </button>
                      </div>
                      {!correctForm.pollingUnitId && (
                        <p className="text-xs text-orange-400 mt-1">
                          A polling unit must be assigned. Use "Search & Override" above to select one.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}