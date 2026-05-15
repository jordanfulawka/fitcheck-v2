import { withAuth } from 'next-auth/middleware';

export default withAuth;

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/job-list/:path*',
    '/status-tracker/:path*',
    '/ai-matcher/:path*',
  ],
};
