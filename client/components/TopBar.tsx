import AddJobButton from './AddJobButton';
import SignOutButton from './SignOutButton';

export default function TopBar() {
  return (
    <div className='h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center px-6'>
      <div className='w-full flex justify-between'>
        <SignOutButton />
        <AddJobButton />
      </div>
    </div>
  );
}
