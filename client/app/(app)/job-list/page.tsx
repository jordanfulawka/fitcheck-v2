'use client';

import { useJobModal } from '@/app/contexts/JobModalContext';
import JobListItem from '@/components/JobListItem';
import { getJobsPaginated } from '@/lib/api/jobs';
import { Job } from '@/types';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState('');

  async function fetchJobs() {
    const { data } = await getJobsPaginated(page, debouncedSearch, status);
    setJobs(data.data.jobs);
    setTotalPages(Math.max(1, data.data.totalPages));
  }

  const { refreshCount } = useJobModal();

  useEffect(() => {
    fetchJobs();
  }, [page, refreshCount]);

  useEffect(() => {
    setPage(1);
    fetchJobs();
  }, [debouncedSearch, status, refreshCount]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className='bg-background h-full p-6'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Your Jobs</h1>
        <p>Here is the list of all of your jobs</p>
      </div>
      <div className='flex items-center justify-end gap-3 mb-4'>
        <div className='relative'>
          <Search
            size={15}
            className='absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none'
          />
          <input
            type='text'
            value={search}
            placeholder='Search by company or role...'
            onChange={(e) => setSearch(e.target.value)}
            className='h-10 w-64 bg-white border-[1.5px] border-[#dee2e6] rounded-lg pl-9 pr-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors'
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className='h-10 bg-white border-[1.5px] border-[#dee2e6] rounded-lg px-3 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors'
        >
          <option value=''>All Statuses</option>
          <option value='Applied'>Applied</option>
          <option value='Interviewing'>Interviewing</option>
          <option value='Offer'>Offer</option>
          <option value='Rejected'>Rejected</option>
        </select>
      </div>

      <div className='bg-white border border-[#dee2e6] rounded-xl shadow-card overflow-hidden h-130 flex flex-col'>
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr_80px] bg-[#f8f9fa] px-6 py-3 border-b border-[#dee2e6]'>
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
          <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
            Actions
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
