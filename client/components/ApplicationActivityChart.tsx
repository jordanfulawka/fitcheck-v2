'use client';
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

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/chart?period=${period}`)
      .then((res) => res.json())
      .then((res) => setData(res.data.filled))
      .catch((err) => console.log(err.message));
  }, [period]);

  return (
    <div className='w-[70%] mt-'>
      <div className='flex gap-2'>
        <button onClick={() => setPeriod('weekly')}>Weekly</button>
        <button onClick={() => setPeriod('monthly')}>Monthly</button>
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
