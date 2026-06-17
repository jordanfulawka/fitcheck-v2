'use client';

import { signIn } from 'next-auth/react';
import { BadgeCheck } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg className='w-5 h-5' viewBox='0 0 24 24'>
      <path
        fill='#4285F4'
        d='M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v2.97h3.86c2.26-2.09 3.59-5.17 3.59-8.79z'
      />
      <path
        fill='#34A853'
        d='M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.07C3.24 21.3 7.31 24 12 24z'
      />
      <path
        fill='#FBBC05'
        d='M5.27 14.32c-.25-.72-.39-1.49-.39-2.32s.14-1.6.39-2.32V6.61H1.27A11.96 11.96 0 0 0 0 12c0 1.93.46 3.76 1.27 5.39l4-3.07z'
      />
      <path
        fill='#EA4335'
        d='M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.94 1.19 15.24 0 12 0 7.31 0 3.24 2.7 1.27 6.61l4 3.07C6.22 6.86 8.87 4.75 12 4.75z'
      />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-surface-container-low via-background to-surface-container'>
      <div className='w-full max-w-sm rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-(--shadow-glass-hover) p-10 flex flex-col items-center'>
        <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-primary-container to-secondary shadow-(--shadow-glass) mb-4'>
          <BadgeCheck className='w-6 h-6 text-white' />
        </div>
        <h1 className='text-2xl font-bold tracking-tight bg-linear-to-r from-primary-container to-secondary bg-clip-text text-transparent'>
          FitCheck
        </h1>
        <p className='mt-2 text-xs font-medium uppercase tracking-wide text-on-surface-variant/70'>
          Job Application Tracker
        </p>

        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className='mt-8 w-full flex items-center justify-center gap-3 py-3 px-5 rounded-lg bg-white/90 backdrop-blur-md border border-white/60 font-semibold text-sm text-on-surface shadow-(--shadow-glass) hover:shadow-(--shadow-glass-hover) hover:-translate-y-0.5 transition-all duration-200'
        >
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
