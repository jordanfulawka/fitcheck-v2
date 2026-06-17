'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <button
      className='flex items-center gap-2 bg-white/80 backdrop-blur-md border border-white/60 text-on-surface text-sm font-medium px-4 py-2 rounded-lg shadow-(--shadow-glass) hover:shadow-(--shadow-glass-hover) hover:-translate-y-0.5 transition-all duration-200'
      onClick={() => signOut()}
    >
      <LogOut className='w-4 h-4' />
      Sign Out
    </button>
  );
}
