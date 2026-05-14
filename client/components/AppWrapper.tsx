'use client';

import { useState } from 'react';
import AddJobModal from './AddJobModal';
import { JobModalContext } from '@/app/contexts/JobModalContext';
import { useRouter } from 'next/navigation';

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  return (
    <>
      <JobModalContext.Provider
        value={{ openModal: () => setIsOpen(true), refreshCount }}
      >
        {children}
        <AddJobModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={() => {
            setIsOpen(false);
            setRefreshCount((prev) => prev + 1);
            router.refresh();
          }}
        />
      </JobModalContext.Provider>
    </>
  );
}
