export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/job-list/:path*',
    '/status-tracker/:path*',
    '/ai-matcher/:path*',
  ],
};
