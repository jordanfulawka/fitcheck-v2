'use client';

import { Job } from '@/types';
import { useDraggable } from '@dnd-kit/react';

const statusColour: Record<string, string> = {
  Applied: '#4361ee',
  Interviewing: '#8429c8',
  Offer: '#1a7a4a',
  Rejected: '#ba1a1a',
};

interface Props {
  job: Job;
}

export default function KanbanCard({ job }: Props) {
  const { ref } = useDraggable({ id: job._id });
  const colour = statusColour[job.status] ?? '#dee2e6';

  return (
    <div
      ref={ref}
      className='rounded-lg bg-white border border-[#dee2e6] shadow-card hover:shadow-elevated p-4 cursor-grab active:cursor-grabbing transition-shadow'
      style={{ borderLeft: `3px solid ${colour}` }}
    >
      <div className='font-semibold text-sm text-on-surface'>{job.role}</div>
      <div className='text-sm text-on-surface-variant mt-0.5'>
        {job.company}
      </div>
      {job.location && (
        <div className='text-xs text-outline mt-1'>{job.location}</div>
      )}
      {job.dateApplied && (
        <div className='text-xs text-outline mt-2 pt-2 border-t border-[#dee2e6]'>
          {new Date(job.dateApplied).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          })}
        </div>
      )}
    </div>
  );
}
