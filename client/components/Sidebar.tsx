'use client';

import {
  BadgeCheck,
  Brain,
  ClipboardList,
  LayoutDashboard,
  SquareKanban,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AddJobButton from './AddJobButton';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className='relative z-10 w-64 h-full bg-surface-container-lowest border-r border-outline-variant flex flex-col items-center justify-between shrink-0 shadow-[4px_0_12px_-2px_rgba(0,0,0,0.1)]'>
      <div>
        <div className='p-8 mb-6 border-b border-outline-variant/60'>
          <div className='flex items-center gap-2.5'>
            <div className='flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-primary-container to-secondary shadow-[--shadow-glass] shrink-0'>
              <BadgeCheck className='w-5 h-5 text-white' />
            </div>
            <h1 className='text-2xl font-bold tracking-tight bg-linear-to-r from-primary-container to-secondary bg-clip-text text-transparent'>
              FitCheck
            </h1>
          </div>
          <p className='mt-2 text-xs font-medium uppercase tracking-wide text-on-surface-variant/70'>
            Check your job fit
          </p>
        </div>
        <ul className='flex flex-col gap-1'>
          <Link href='/dashboard'>
            <li
              className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 transition-all duration-200 ${pathname === '/dashboard' ? 'bg-surface-container-high text-primary border-l-secondary' : 'border-l-transparent hover:bg-surface-container-low hover:border-l-outline-variant hover:translate-x-0.5'}`}
            >
              <LayoutDashboard />
              Dashboard
            </li>
          </Link>
          <Link href='/status-tracker'>
            <li
              className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 transition-all duration-200 ${pathname === '/status-tracker' ? 'bg-surface-container-high text-primary border-l-secondary' : 'border-l-transparent hover:bg-surface-container-low hover:border-l-outline-variant hover:translate-x-0.5'}`}
            >
              <SquareKanban />
              Status Tracker
            </li>
          </Link>
          <Link href='/job-list'>
            <li
              className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 transition-all duration-200 ${pathname === '/job-list' ? 'bg-surface-container-high text-primary border-l-secondary' : 'border-l-transparent hover:bg-surface-container-low hover:border-l-outline-variant hover:translate-x-0.5'}`}
            >
              <ClipboardList />
              Job List
            </li>
          </Link>
          <Link href='ai-matcher'>
            <li
              className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 transition-all duration-200 ${pathname === '/ai-matcher' ? 'bg-surface-container-high text-primary border-l-secondary' : 'border-l-transparent hover:bg-surface-container-low hover:border-l-outline-variant hover:translate-x-0.5'}`}
            >
              <Brain />
              AI Matcher
            </li>
          </Link>
        </ul>
      </div>
      <div className='mb-10'>
        <AddJobButton />
      </div>
    </nav>
  );
}
