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
    <div
      className='bg-white border border-[#dee2e6] rounded-xl p-5 flex-1'
      style={{ boxShadow: '0 4px 12px rgba(26,26,46,0.05)' }}
    >
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-base font-semibold text-on-surface'>
            Application Activity
          </h2>
          <p className='text-sm text-on-surface-variant mt-0.5'>
            Jobs applied over time
          </p>
        </div>
        <div className='flex gap-1 bg-surface-container-low p-1 rounded-lg'>
          <button
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              period === 'weekly'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              period === 'monthly'
                ? 'bg-white text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <ResponsiveContainer width='100%' height={280}>
        <BarChart data={data} barSize={32}>
          <XAxis
            dataKey='_id'
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#444655' }}
          />
          <YAxis
            dataKey='count'
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#444655' }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #dee2e6',
              boxShadow: '0 4px 12px rgba(26,26,46,0.05)',
            }}
            cursor={{ fill: '#4361ee08' }}
          />
          <Bar dataKey='count' fill='#4361ee' radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
