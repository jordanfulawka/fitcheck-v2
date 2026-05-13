'use client';

import {
  Brain,
  ClipboardList,
  LayoutDashboard,
  SquareKanban,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className='w-64 h-full bg-surface-container-lowest border-r border-outline-variant flex flex-col items-center shrink-0'>
      <div className='p-8'>
        <h1 className='text-2xl font-bold'>FitCheck</h1>
        <p>Job Application Tracker</p>
      </div>
      <ul>
        <Link href='/dashboard'>
          <li
            className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 border-transparent ${pathname === '/dashboard' ? 'bg-surface-container-high text-primary border-l-secondary' : ''}`}
          >
            <LayoutDashboard />
            Dashboard
          </li>
        </Link>
        <Link href='/status-tracker'>
          <li
            className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 border-transparent ${pathname === '/status-tracker' ? 'bg-surface-container-high text-primary border-l-secondary' : ''}`}
          >
            <SquareKanban />
            Status Tracker
          </li>
        </Link>
        <Link href='/job-list'>
          <li
            className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 border-transparent ${pathname === '/job-list' ? 'bg-surface-container-high text-primary border-l-secondary' : ''}`}
          >
            <ClipboardList />
            Job List
          </li>
        </Link>
        <Link href='ai-matcher'>
          <li
            className={`flex gap-2 p-5 rounded-lg font-semibold border-l-4 border-transparent ${pathname === '/ai-matcher' ? 'bg-surface-container-high text-primary border-l-secondary' : ''}`}
          >
            <Brain />
            AI Matcher
          </li>
        </Link>
      </ul>
    </nav>
  );
}
