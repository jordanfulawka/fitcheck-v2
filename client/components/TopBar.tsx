import AddJobButton from './AddJobButton';

export default function TopBar() {
  return (
    <div className='h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center px-6'>
      <div className='w-full flex justify-end'>
        <AddJobButton />
      </div>
    </div>
  );
}
