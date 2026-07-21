import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '../components/SessionProvider';
import { getServerSession } from 'next-auth';
import ReactQueryClientProvider from './contexts/ReactQueryClientProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FitCheck',
  description: 'Job application tracking platform',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <ReactQueryClientProvider>
      <html lang='en' className={`${inter.variable} h-full antialiased`}>
        <body className='min-h-full flex flex-col'>
          <SessionProvider session={session}>{children}</SessionProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
