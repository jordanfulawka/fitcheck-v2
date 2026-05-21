'use client';

import { Job } from '@/types';
import { createContext, useContext } from 'react';

interface JobModalContextType {
  openModal: () => void;
  openEditModal: (job: Job) => void;
  refreshCount: number;
}

export const JobModalContext = createContext<JobModalContextType>({
  openModal: () => {},
  openEditModal: () => {},
  refreshCount: 0,
});

export function useJobModal() {
  return useContext(JobModalContext);
}
