'use client';

import { useJobModal } from '@/app/contexts/JobModalContext';

export default function AddJobButton() {
  const { openModal } = useJobModal();

  return (
    <button
      onClick={openModal}
      className='py-3 px-5 rounded-lg text-white font-semibold text-sm bg-primary-container/90 backdrop-blur-md border border-white/30 shadow-[--shadow-glass] hover:shadow-[--shadow-glass-hover] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2'
    >
      Add New Job
    </button>
  );
}
