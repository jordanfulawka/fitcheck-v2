import ApplicationActivityChart from '@/components/ApplicationActivityChart';
import { getDashboardJobs } from '@/lib/api/jobs';
import {
  Ban,
  CalendarCheck2,
  CircleCheckBig,
  SendHorizonal,
} from 'lucide-react';
import { getServerSession } from 'next-auth';

export default async function Dashboard() {
  const session = await getServerSession();
  const email = session?.user?.email;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/stats`, {
    headers: { 'x-user-email': email ?? '' },
  });

  const { data } = await res.json();

  return (
    <div className='bg-background h-full p-6 flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight text-on-surface'>
          Overview
        </h1>
        <p className='text-sm text-on-surface-variant mt-1'>
          Track your job search progress at a glance.
        </p>
      </div>

      <div className='grid grid-cols-4 gap-4'>
        <div
          className='bg-white border border-[#dee2e6] rounded-xl p-5'
          style={{ boxShadow: '0 4px 12px rgba(26,26,46,0.05)' }}
        >
          <div className='flex items-center justify-between mb-4'>
            <span className='text-xs font-semibold uppercase tracking-wide text-on-surface-variant'>
              Applications
            </span>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: '#2346d515' }}
            >
              <SendHorizonal size={18} color='#2346d5' />
            </div>
          </div>
          <p className='text-4xl font-bold text-primary'>{data.result.total}</p>
          <p className='text-sm text-on-surface-variant mt-1'>
            Total submitted
          </p>
        </div>

        <div
          className='bg-white border border-[#dee2e6] rounded-xl p-5'
          style={{ boxShadow: '0 4px 12px rgba(26,26,46,0.05)' }}
        >
          <div className='flex items-center justify-between mb-4'>
            <span className='text-xs font-semibold uppercase tracking-wide text-on-surface-variant'>
              Interviews
            </span>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: '#8429c815' }}
            >
              <CalendarCheck2 size={18} color='#8429c8' />
            </div>
          </div>
          <p className='text-4xl font-bold text-secondary'>
            {data.result.interviewing.length}
          </p>
          <p className='text-sm text-on-surface-variant mt-1'>
            Currently scheduled
          </p>
        </div>

        <div
          className='bg-white border border-[#dee2e6] rounded-xl p-5'
          style={{ boxShadow: '0 4px 12px rgba(26,26,46,0.05)' }}
        >
          <div className='flex items-center justify-between mb-4'>
            <span className='text-xs font-semibold uppercase tracking-wide text-on-surface-variant'>
              Offers
            </span>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: '#1a7a4a15' }}
            >
              <CircleCheckBig size={18} color='#1a7a4a' />
            </div>
          </div>
          <p className='text-4xl font-bold' style={{ color: '#1a7a4a' }}>
            {data.result.offer.length}
          </p>
          <p className='text-sm text-on-surface-variant mt-1'>
            Received so far
          </p>
        </div>

        <div
          className='bg-white border border-[#dee2e6] rounded-xl p-5'
          style={{ boxShadow: '0 4px 12px rgba(26,26,46,0.05)' }}
        >
          <div className='flex items-center justify-between mb-4'>
            <span className='text-xs font-semibold uppercase tracking-wide text-on-surface-variant'>
              Rejections
            </span>
            <div
              className='p-2 rounded-lg'
              style={{ backgroundColor: '#ba1a1a15' }}
            >
              <Ban size={18} color='#ba1a1a' />
            </div>
          </div>
          <p className='text-4xl font-bold text-error'>
            {data.result.rejected.length}
          </p>
          <p className='text-sm text-on-surface-variant mt-1'>Total received</p>
        </div>
      </div>

      <ApplicationActivityChart />
    </div>
  );
}
