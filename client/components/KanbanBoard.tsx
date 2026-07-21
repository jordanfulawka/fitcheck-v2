'use client';

import { useEffect, useState } from 'react';
import KanbanCard from './KanbanCard';
import KanbanColumn from './KanbanColumn';
import { DragDropProvider } from '@dnd-kit/react';
import { Job } from '@/types';
import { getJobs, updateJobStatus } from '@/lib/api/jobs';
import { useJobModal } from '@/app/contexts/JobModalContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function KanbanBoard() {
  const { refreshCount } = useJobModal();

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['kanban', refreshCount],
    queryFn: getJobs,
  });

  console.log(data?.data.data.jobs);

  const mutation = useMutation({
    mutationFn: ({ jobId, newStatus }: { jobId: string; newStatus: string }) =>
      updateJobStatus(jobId, newStatus),
    onMutate: async ({
      jobId,
      newStatus,
    }: {
      jobId: string;
      newStatus: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ['kanban'] });
      const previousKanbanJobs = queryClient.getQueryData(['kanban']);
      queryClient.setQueryData(['kanban', refreshCount], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            data: {
              ...old.data.data,
              jobs: old.data.data.jobs.map((job: Job) => {
                return job._id === jobId ? { ...job, status: newStatus } : job;
              }),
            },
          },
        };
      });
      return { previousKanbanJobs };
    },
    onError: (
      err,
      { jobId, newStatus }: { jobId: string; newStatus: string },
      context,
    ) => {
      queryClient.setQueryData(['kanban'], context?.previousKanbanJobs);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
    },
  });

  // useEffect(() => {
  //   async function fetchJobs() {
  //     const data = await getJobs();
  //     setJobs(data.data.data.jobs);
  //   }

  //   fetchJobs();
  // }, [refreshCount]);

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

        // const previousJobs = jobs;

        // setJobs((prev) =>
        //   prev.map((job) =>
        //     job._id === jobId ? { ...job, status: newStatus } : job,
        //   ),
        // );

        // updateJobStatus(jobId, newStatus).catch(() => {
        //   setJobs(previousJobs);
        // });
        mutation.mutate({ jobId, newStatus });
      }}
    >
      <div className='flex gap-4 justify-around'>
        <KanbanColumn id='Applied' colour='#4361ee'>
          {data?.data.data.jobs
            .filter((job: Job) => job.status === 'Applied')
            .map((job: Job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
        <KanbanColumn id='Interviewing' colour='#8429c8'>
          {data?.data.data.jobs
            .filter((job: Job) => job.status === 'Interviewing')
            .map((job: Job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
        <KanbanColumn id='Offer' colour='#1a7a4a'>
          {data?.data.data.jobs
            .filter((job: Job) => job.status === 'Offer')
            .map((job: Job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
        <KanbanColumn id='Rejected' colour='#ba1a1a'>
          {data?.data.data.jobs
            .filter((job: Job) => job.status === 'Rejected')
            .map((job: Job) => (
              <KanbanCard key={job._id} job={job} />
            ))}
        </KanbanColumn>
      </div>
    </DragDropProvider>
  );
}
