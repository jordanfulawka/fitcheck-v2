'use client';
import { useJobModal } from '@/app/contexts/JobModalContext';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ApplicationActivityChart() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const [data, setData] = useState([]);

  const { refreshCount } = useJobModal();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/chart?period=${period}`)
      .then((res) => res.json())
      .then((res) => setData(res.data.filled))
      .catch((err) => console.log(err.message));
  }, [period, refreshCount]);

  return (
    <div className='w-[70%] mt-5'>
      <div className='flex gap-2 justify-end'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          onClick={() => setPeriod('weekly')}
        >
          Weekly
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
          onClick={() => setPeriod('monthly')}
        >
          Monthly
        </button>
      </div>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data}>
          <XAxis dataKey='_id' />
          <YAxis dataKey='count' allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='count' fill='#4361ee' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
