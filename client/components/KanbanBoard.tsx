'use client';

import { useEffect, useState } from 'react';
import KanbanCard from './KanbanCard';
import KanbanColumn from './KanbanColumn';
import { DragDropProvider } from '@dnd-kit/react';
import { Job } from '@/types';
import { getJobs, updateJobStatus } from '@/lib/api/jobs';
import { useJobModal } from '@/app/contexts/JobModalContext';

export default function KanbanBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const { refreshCount } = useJobModal();

  // useEffect(() => {
  //   async function fetchJobs() {
  //     const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
  //     const res = await data.json();
  //     setJobs(res.data.jobs);
  //     console.log(res.data.jobs);
  //   }

  //   fetchJobs();
  // }, [refreshCount]);

  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data.data.data.jobs);
      console.log(data.data.data.jobs);
    }

    fetchJobs();
  }, [refreshCount]);

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const source = event.operation.source;
        const target = event.operation.target;

        if (!source || !target) return;

        const jobId = source.id as string;
        const newStatus = target.id as string;

        if (!newStatus) return;

        const previousJobs = jobs;

        setJobs((prev) =>
          prev.map((job) =>
            job._id === jobId ? { ...job, status: newStatus } : job,
          ),
        );

        updateJobStatus(jobId, newStatus).catch(() => {
          setJobs(previousJobs);
        });
      }}
    >
      <div className='flex gap-4 justify-around'>
        <KanbanColumn id='Applied' colour='#4361ee'>
          {jobs
            .filter((job) => job.status === 'Applied')
            .map((job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
        <KanbanColumn id='Interviewing' colour='#8429c8'>
          {jobs
            .filter((job) => job.status === 'Interviewing')
            .map((job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
        <KanbanColumn id='Offer' colour='#1a7a4a'>
          {jobs
            .filter((job) => job.status === 'Offer')
            .map((job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
        <KanbanColumn id='Rejected' colour='#ba1a1a'>
          {jobs
            .filter((job) => job.status === 'Rejected')
            .map((job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
      </div>
    </DragDropProvider>
  );
}
