'use client';

import { useDroppable } from '@dnd-kit/react';

export default function KanbanColumn({
  id,
  colour,
  children,
}: {
  id: string;
  colour: string;
  children: React.ReactNode;
}) {
  const { ref } = useDroppable({
    id,
  });
  return (
    <div
      ref={ref}
      className='border border-black bg-[#f1f3f5] rounded-t-xl rounded-xl w-90 min-hg-74 p-4'
    >
      <span
        className={`text-lg font-semibold px-4 py-5`}
        style={{ color: colour }}
      >
        {id}
      </span>
      {children}
    </div>
  );
}
