import { getJobs, updateJob } from '@/lib/api/jobs';
import { Job, MatchResult } from '@/types';
import { Briefcase, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function JobSelectionModal({
  isOpen,
  onClose,
  result,
}: {
  isOpen: boolean;
  onClose: () => void;
  result: MatchResult;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data.data.data.jobs);
    }
    fetchJobs();
  }, []);

  async function saveToJob(id: string) {
    setLoading(true);
    setError(null);
    try {
      await updateJob(id, { matchResult: { ...result, savedAt: new Date() } });
      onClose();
    } catch (e) {
      setError('Failed to save. Please try again');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className='fixed inset-0 flex justify-center items-center z-50 bg-black/40'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl w-full max-w-md mx-4'
        style={{ boxShadow: '0 12px 24px rgba(26, 26, 46, 0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between px-6 py-5 border-b border-[#dee2e6]'>
          <div>
            <h2 className='text-lg font-semibold text-on-surface'>
              Save to Job
            </h2>
            <p className='text-xs text-on-surface-variant mt-0.5'>
              Select a job to attach this match result
            </p>
          </div>
          <button
            onClick={onClose}
            className='text-on-surface-variant hover:text-on-surface transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <div className='overflow-y-auto max-h-72 py-2'>
          {jobs.length === 0 ? (
            <p className='text-sm text-on-surface-variant text-center py-8'>
              No jobs found.
            </p>
          ) : (
            jobs.map((job) => (
              <button
                key={job._id}
                onClick={() => saveToJob(job._id)}
                disabled={loading}
                className='w-full flex items-center gap-4 px-6 py-3.5 text-left hover:bg-surface-container-low disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                <div className='w-9 h-9 rounded-lg bg-primary-container/10 flex items-center justify-center shrink-0'>
                  <Briefcase size={16} color='#4361ee' />
                </div>
                <div className='min-w-0'>
                  <p className='text-sm font-semibold text-on-surface truncate'>
                    {job.company}
                  </p>
                  <p className='text-xs text-on-surface-variant truncate'>
                    {job.role}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>

        {error && (
          <div className='px-6 pb-4'>
            <p className='text-xs text-error'>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
