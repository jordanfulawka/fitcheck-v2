'use client';

import { useJobModal } from '@/app/contexts/JobModalContext';
import { deleteJob } from '@/lib/api/jobs';
import { Job } from '@/types';
import { Pencil, Sparkles, Trash2 } from 'lucide-react';
import { useState } from 'react';
import MatchResultModal from './MatchResultModal';

const statusStyles: Record<string, string> = {
  Applied: 'bg-[#4361ee]/10 border border-[#4361ee] text-[#4361ee]',
  Interviewing: 'bg-[#8429c8]/10 border border-[#8429c8] text-[#8429c8]',
  Offer: 'bg-[#1a7a4a]/10 border border-[#1a7a4a] text-[#1a7a4a]',
  Rejected: 'bg-[#ba1a1a]/10 border border-[#ba1a1a] text-[#ba1a1a]',
};

export default function JobListItem({
  job,
  onDelete,
}: {
  job: Job;
  onDelete: () => void;
}) {
  const [showMatchModal, setShowMatchModal] = useState(false);

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

  const { openEditModal } = useJobModal();

  return (
    <div className='grid grid-cols-[1fr_1fr_1fr_1fr_80px] px-6 py-6 border-b border-[#dee2e6] hover:bg-surface-container-low items-center last:border-b-0'>
      <span className='text-sm font-semibold text-[#1a1a2e]'>
        {job.company}
      </span>
      <span className='text-sm text-on-surface-variant'>{job.role}</span>
      <span className='text-sm text-outline'>{formattedDate}</span>
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[job.status] ?? 'bg-[#dee2e6] text-[#1a1a2e]'}`}
      >
        {job.status}
      </span>
      {showMatchModal && (
        <MatchResultModal
          result={job.matchResult}
          onClose={() => setShowMatchModal(false)}
        />
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
          onClick={() => setShowMatchModal(true)}
          className='p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors w-fit'
        >
          <Sparkles size={16} />
        </button>
      </div>
    </div>
  );
}
