import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

export default function AppLayout({ children }) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <TopBar />
        <main className='flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  );
}
