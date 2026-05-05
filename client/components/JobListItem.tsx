import { Job } from '@/types';

const statusStyles: Record<string, string> = {
  Applied: 'bg-[#4361ee]/10 border border-[#4361ee] text-[#4361ee]',
  Interviewing: 'bg-[#8429c8]/10 border border-[#8429c8] text-[#8429c8]',
  Offer: 'bg-[#1a7a4a]/10 border border-[#1a7a4a] text-[#1a7a4a]',
  Rejected: 'bg-[#ba1a1a]/10 border border-[#ba1a1a] text-[#ba1a1a]',
};

export default function JobListItem({ job }: { job: Job }) {
  const formattedDate = job.dateApplied
    ? new Date(job.dateApplied).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '-';
  return (
    <div className='grid grid-cols-4 px-6 py-4 border-b border-[#dee2e6] hover:bg-surface-container-low items-center last:border-b-0'>
      <span className='text-sm font-semibold text-[#1a1a2e]'>
        {job.company}
      </span>
      <span className='text-sm text-on-surface-variant'>{job.role}</span>
      <span className='text-sm text-outline'>{formattedDate}</span>
      <span
        className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[job.status] ?? 'bg-[#dee2e6] text-[#1a1a2e]'}`}
      >
        {job.status}
      </span>
    </div>
  );
}
