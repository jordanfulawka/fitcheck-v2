'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button
      className='bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors'
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
