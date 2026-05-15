'use client';

import { useJobModal } from '@/app/contexts/JobModalContext';
import JobListItem from '@/components/JobListItem';
import { deleteJob, getJobsPaginated } from '@/lib/api/jobs';
import { Job } from '@/types';
import { useEffect, useState } from 'react';

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchJobs() {
    const { data } = await getJobsPaginated(page);
    console.log(data);
    setJobs(data.data.jobs);
    setTotalPages(Math.max(1, data.data.totalPages));
  }

  const { refreshCount } = useJobModal();

  useEffect(() => {
    fetchJobs();
  }, [page, refreshCount]);

  return (
    <div className='bg-background h-full p-6'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Your Jobs</h1>
        <p>Here is the list of all of your jobs</p>
      </div>

      <div className='bg-white border border-[#dee2e6] rounded-xl shadow-card overflow-hidden h-130 flex flex-col'>
        <div className='grid grid-cols-5 bg-[#f8f9fa] px-6 py-3 border-b border-[#dee2e6]'>
          <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
            Company
          </span>
          <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
            Role
          </span>
          <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
            Date Applied
          </span>
          <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
            Status
          </span>
        </div>

        <div className='min-h-75'>
          {jobs.map((job) => (
            <JobListItem key={job._id} job={job} onDelete={fetchJobs} />
          ))}
        </div>

        <div className='flex items-center justify-center gap-4 mt-auto py-4'>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className='px-4 py-2 text-sm font-semibold border border-primary text-primary
  rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10'
          >
            Previous
          </button>
          <span className='text-sm text-on-surface-variant'>
            Page {page} of {totalPages}
          </span>
          <button
            className='px-4 py-2 text-sm font-semibold border border-primary text-primary
  rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10'
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
