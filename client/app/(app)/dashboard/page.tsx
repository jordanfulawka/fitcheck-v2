import ApplicationActivityChart from '@/components/ApplicationActivityChart';
import {
  Ban,
  CalendarCheck2,
  CircleCheckBig,
  SendHorizonal,
} from 'lucide-react';

export default async function Dashboard() {
  const res = await fetch(`${process.env.API_URL}/api/jobs/stats`);
  const { data } = await res.json();

  return (
    <div className='bg-background h-full p-6'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Overview</h1>
        <p>Hello! Ready to apply for some more jobs?</p>
      </div>
      <div className='flex gap-20 px-5 justify-between'>
        <div className='border border-[#dee2e6] flex-1 bg-white h-32 rounded-lg'>
          <div className='flex justify-between pt-4 px-4'>
            <h1 className='text-lg font-bold text-gray-500'>
              Total Applications
            </h1>
            <SendHorizonal size={32} color={'#2346d5'} />
          </div>
          <p className='text-primary text-4xl font-bold pl-5'>
            {data.result.total}
          </p>
        </div>
        <div className='border border-[#dee2e6] flex-1 bg-white rounded-lg'>
          <div className='flex justify-between pt-4 px-4'>
            <h1 className='text-lg font-bold text-gray-500'>
              Interviews Scheduled
            </h1>
            <CalendarCheck2 size={32} color={'#8429c8'} />
          </div>
          <p className='text-secondary text-4xl font-bold pl-5'>
            {data.result.interviewing}
          </p>
        </div>
        <div className='border border-[#dee2e6] flex-1 bg-white rounded-lg'>
          <div className='flex justify-between pt-4 px-4'>
            <h1 className='text-lg font-bold text-gray-500'>Offers Received</h1>
            <CircleCheckBig size={32} color={'#1a7a4a'} />
          </div>
          <p className='text-[#1a7a4a] text-4xl font-bold pl-5'>
            {data.result.offer}
          </p>
        </div>
        <div className='border border-[#dee2e6] flex-1 bg-white rounded-lg'>
          <div className='flex justify-between pt-4 px-4'>
            <h1 className='text-lg font-bold text-gray-500'>Rejections</h1>
            <Ban size={32} color={'#ba1a1a'} />
          </div>
          <p className='text-error text-4xl font-bold pl-5'>
            {data.result.rejected}
          </p>
        </div>
      </div>
      <ApplicationActivityChart />
    </div>
  );
}
