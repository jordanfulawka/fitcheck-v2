import AddJobButton from './AddJobButton';
import SignOutButton from './SignOutButton';

export default function TopBar() {
  return (
    <div className='relative z-10 h-16 bg-surface-container-lowest border-b border-outline-variant flex items-center px-6 shadow-xl'>
      <div className='w-full flex justify-between'>
        <SignOutButton />
        <AddJobButton />
      </div>
    </div>
  );
}
