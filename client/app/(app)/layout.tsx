import AppWrapper from '@/components/AppWrapper';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <AppWrapper>
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <TopBar />
          <main className='flex-1 overflow-auto'>{children}</main>
        </div>
      </AppWrapper>
    </div>
  );
}
