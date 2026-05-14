'use client';

import { useJobModal } from '@/app/contexts/JobModalContext';

export default function AddJobButton() {
  const { openModal } = useJobModal();

  return (
    <button
      onClick={openModal}
      className='py-3 px-5 rounded-lg text-white font-semibold text-sm bg-linear-to-r from-primary-container to-secondary hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2'
    >
      Add New Job
    </button>
  );
}
