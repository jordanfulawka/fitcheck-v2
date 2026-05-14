'use client';

import { useDroppable } from '@dnd-kit/react';
import React from 'react';

export default function KanbanColumn({
  id,
  colour,
  children,
}: {
  id: string;
  colour: string;
  children: React.ReactNode;
}) {
  const { ref } = useDroppable({ id });
  const count = React.Children.count(children);

  return (
    <div
      ref={ref}
      className='flex flex-col flex-1 min-h-130 bg-surface-container-low rounded-xl border border-[#dee2e6] overflow-hidden'
    >
      <div className='h-1 w-full' style={{ backgroundColor: colour }} />
      <div className='flex items-center justify-between px-4 py-3 border-b border-[#dee2e6]'>
        <span
          className='text-sm font-semibold tracking-wide'
          style={{ color: colour }}
        >
          {id}
        </span>
        <span
          className='text-xs font-semibold px-2 py-0.5 rounded-full'
          style={{ backgroundColor: `${colour}20`, color: colour }}
        >
          {count}
        </span>
      </div>
      <div className='flex flex-col gap-3 p-3 flex-1'>{children}</div>
    </div>
  );
}
