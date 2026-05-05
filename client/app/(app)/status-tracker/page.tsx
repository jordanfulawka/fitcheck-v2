import KanbanBoard from '@/components/KanbanBoard';

export default function StatusTracker() {
  return (
    <div className='bg-background h-full p-6'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Status Tracker</h1>
      </div>
      <KanbanBoard />
    </div>
  );
}
