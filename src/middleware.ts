import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import SessionManager from './lib/SessionManager';

const route = {
  path: {
    protected: {
      admin: ['/dashboard/admin'],
      agent: ['/dashboard/agent'],
    },
    public: [
      '/sign-in',
      '/sign-in/verify-2fa',
      '/sign-up',
      '/verify-email',
      '/forgot-password',
      '/reset-password',
    ],
  },
};

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const utils = new SessionManager();

  // Check for path routes
  const isProtectedRoute =
    route.path.protected.admin.some((protectedPath) =>
      path.startsWith(protectedPath),
    ) ||
    route.path.protected.agent.some((protectedPath) =>
      path.startsWith(protectedPath),
    );
  const ispathPublicRoute = route.path.public.includes(path);

  // Decrypt the path session
  const cookie = (await cookies()).get('__xa92be3')?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);

  // Handle path routes
  if (isProtectedRoute && !session) {
    await utils.deleteSession('__xa91fe7');
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (ispathPublicRoute && session) {
    const pathPath =
      session.role === 'admin'
        ? '/dashboard/admin/overview'
        : '/dashboard/agent/overview';

    if (!req.nextUrl.pathname.startsWith(pathPath)) {
      return NextResponse.redirect(new URL(pathPath, req.nextUrl));
    }
  }

  // Check role-based access for path protected routes
  if (session) {
    if (
      route.path.protected.admin.some((protectedPath) =>
        path.startsWith(protectedPath),
      ) &&
      session.role !== 'admin'
    ) {
      return NextResponse.redirect(
        new URL('/dashboard/agent/overview', req.nextUrl),
      );
    }

    if (
      route.path.protected.agent.some((protectedPath) =>
        path.startsWith(protectedPath),
      ) &&
      session.role !== 'agent'
    ) {
      return NextResponse.redirect(
        new URL('/dashboard/admin/overview', req.nextUrl),
      );
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
