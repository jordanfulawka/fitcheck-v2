'use client';

import { Job } from '@/types';
import { useDraggable } from '@dnd-kit/react';

interface Props {
  job: Job;
}

export default function KanbanCard({ job }: Props) {
  const { ref } = useDraggable({
    id: job._id,
  });

  return (
    <div
      className='rounded-xl bg-white border border-[#dee2e6] shadow-card hover:shadow-elevated p-4 mb-3'
      ref={ref}
    >
      <div className='font-semibold text-sm'>{job?.role}</div>
      <div className='text-sm text-on-surface-variant'>{job?.company}</div>
      <div className='text-xs text-outline'>{job?.location}</div>
    </div>
  );
}
