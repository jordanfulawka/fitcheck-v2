import KanbanBoard from '@/components/KanbanBoard';

export default function StatusTracker() {
  return (
    <div className='bg-background h-full p-6'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Status Tracker</h1>
        <p>
          Here you can view all of your jobs in a clear format sorted by status
        </p>
      </div>
      <KanbanBoard />
    </div>
  );
}
