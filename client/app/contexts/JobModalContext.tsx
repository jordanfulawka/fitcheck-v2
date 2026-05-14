'use client';

import { createContext, useContext } from 'react';

interface JobModalContextType {
  openModal: () => void;
  refreshCount: number;
}

export const JobModalContext = createContext<JobModalContextType>({
  openModal: () => {},
  refreshCount: 0,
});

export function useJobModal() {
  return useContext(JobModalContext);
}
