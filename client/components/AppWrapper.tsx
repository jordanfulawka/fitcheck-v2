'use client';

import { useState } from 'react';
import AddJobModal from './AddJobModal';
import { JobModalContext } from '@/app/contexts/JobModalContext';
import { useRouter } from 'next/navigation';
import { Job } from '@/types';

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  return (
    <>
      <JobModalContext.Provider
        value={{
          openModal: () => setIsOpen(true),
          openEditModal: (job: Job) => {
            setEditingJob(job);
            setIsOpen(true);
          },
          refreshCount,
        }}
      >
        {children}
        <AddJobModal
          isOpen={isOpen}
          job={editingJob}
          onClose={() => {
            setIsOpen(false);
            setEditingJob(null);
          }}
          onSuccess={() => {
            setIsOpen(false);
            setEditingJob(null);
            setRefreshCount((prev) => prev + 1);
            router.refresh();
          }}
        />
      </JobModalContext.Provider>
    </>
  );
}
