'use client';

import { useJobModal } from '@/app/contexts/JobModalContext';
import { deleteJob, updateJobStatus } from '@/lib/api/jobs';
import { Job } from '@/types';
import { Pencil, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import MatchResultModal from './MatchResultModal';
import { useRouter } from 'next/navigation';

const statusStyles: Record<string, string> = {
  Applied: 'bg-[#4361ee]/10 border border-[#4361ee] text-[#4361ee]',
  Interviewing: 'bg-[#8429c8]/10 border border-[#8429c8] text-[#8429c8]',
  Offer: 'bg-[#1a7a4a]/10 border border-[#1a7a4a] text-[#1a7a4a]',
  Rejected: 'bg-[#ba1a1a]/10 border border-[#ba1a1a] text-[#ba1a1a]',
};

export default function JobListItem({
  job,
  onDelete,
  onUpdate,
}: {
  job: Job;
  onDelete: () => void;
  onUpdate: () => void;
}) {
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(job.status);
  const [showNoMatchPrompt, setShowNoMatchPrompt] = useState(false);

  const router = useRouter();

  const formattedDate = job.dateApplied
    ? new Date(job.dateApplied).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '-';

  async function handleDelete(id: string) {
    await deleteJob(id);
    onDelete();
  }

  async function handleStatusChange(newStatus: string) {
    setCurrentStatus(newStatus);
    await updateJobStatus(job._id, newStatus);
    onUpdate();
  }

  useEffect(() => {
    setCurrentStatus(job.status);
  }, [job.status]);

  function handleSparkleClick() {
    if (job.matchResult?.matchScore) {
      setShowMatchModal(true);
    } else {
      setShowNoMatchPrompt(true);
    }
  }

  function goToMatcher() {
    localStorage.setItem('prefillJobDescription', job.jobDescription ?? '');
    router.push('/ai-matcher');
  }

  const { openEditModal } = useJobModal();

  return (
    <div className='grid grid-cols-[1fr_1fr_1fr_1fr_80px] px-6 py-6 border-b border-[#dee2e6] hover:bg-surface-container-low items-center last:border-b-0'>
      <span className='text-sm font-semibold text-[#1a1a2e]'>
        {job.company}
      </span>
      <span className='text-sm text-on-surface-variant'>{job.role}</span>
      <span className='text-sm text-outline'>{formattedDate}</span>
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`w-fit text-center rounded-full px-3 py-1 text-xs font-semibold appearance-none cursor-pointer focus:outline-none ${statusStyles[currentStatus] ?? 'bg-[#dee2e6] text-[#1a1a2e]'}`}
      >
        <option value='Applied'>Applied</option>
        <option value='Interviewing'>Interviewing</option>
        <option value='Offer'>Offer</option>
        <option value='Rejected'>Rejected</option>
      </select>
      {showMatchModal && (
        <MatchResultModal
          result={job.matchResult}
          onClose={() => setShowMatchModal(false)}
        />
      )}
      {showNoMatchPrompt && (
        <div className='fixed inset-0 flex justify-center items-center bg-black/40 z-50'>
          <div className='bg-white rounded-xl p-6 max-w-sm shadow-elevated'>
            <p className='text-sm font-semibold text-on-surface'>
              No AI match found for this job.
            </p>
            <p className='text-sm text-on-surface-variant mt-1'>
              Go to the AI Matcher now?
            </p>
            <div className='flex gap-3 mt-5 justify-end'>
              <button
                onClick={() => setShowNoMatchPrompt(false)}
                className='px-4 py-2 text-sm font-semibold rounded-lg text-on-surface-variant hover:bg-surface-container-low'
              >
                No, maybe later
              </button>
              <button
                onClick={goToMatcher}
                className='px-4 py-2 text-sm font-semibold rounded-lg text-white bg-primary-container hover:opacity-90'
              >
                Let&apos;s go!
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-center'>
        <button
          onClick={() => handleDelete(job._id)}
          className='p-2 rounded-lg text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors w-fit'
        >
          <Trash2 size={16} />
        </button>
        <button
          onClick={() => openEditModal(job)}
          className='p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors w-fit'
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={handleSparkleClick}
          className='p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors w-fit'
        >
          <Sparkles size={16} />
        </button>
      </div>
    </div>
  );
}
