'use client';
import { useJobModal } from '@/app/contexts/JobModalContext';
import { getActivityChartJobs } from '@/lib/api/jobs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'path';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipContentProps,
} from 'recharts';

export default function ApplicationActivityChart() {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const { refreshCount } = useJobModal();

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['chart', period, refreshCount],
    queryFn: () => getActivityChartJobs(period),
  });

  function formatTick(value: string) {
    const date =
      period === 'monthly' ? new Date(`${value}-01`) : new Date(value);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      ...(period === 'weekly' && { day: 'numeric' }),
      timeZone: 'UTC',
    });
  }

  function CustomTooltip({ active, payload, label }: TooltipContentProps) {
    const firstPayload = payload?.[0];
    const isVisible = active && firstPayload != null;
    if (!isVisible) return null;
    const count = firstPayload.value;
    return (
      <div className='rounded-lg bg-white border border-[#dee2e6] shadow-[0_4px_12px_rgba(26,26,46,0.05)] px-3 py-2'>
        <p className='text-xs font-semibold text-on-surface'>
          {formatTick(String(label))}
        </p>
        <p className='text-sm text-primary font-medium mt-0.5'>
          {count} application{count === 1 ? '' : 's'}
        </p>
      </div>
    );
  }

  return (
    <div
      className='bg-white border border-[#dee2e6] rounded-xl p-5'
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

      <div className='focus:outline-none **:focus:outline-none'>
        <ResponsiveContainer width='100%' height={280}>
          <BarChart data={query.data?.data.data.filled} barSize={32}>
            <XAxis
              tickFormatter={formatTick}
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
              content={CustomTooltip}
            />
            <Bar dataKey='count' fill='#4361ee' radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
