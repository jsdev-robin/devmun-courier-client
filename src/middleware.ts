import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import SessionManager from './lib/SessionManager';

const route = {
  path: {
    protected: {
      admin: ['/dashboard/admin'],
      agent: ['/dashboard/agent'],
      customer: ['/dashboard/customer'],
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
    ) ||
    route.path.protected.customer.some((protectedPath) =>
      path.startsWith(protectedPath),
    );
  const ispathPublicRoute = route.path.public.includes(path);

  // Decrypt the path session
  const cookie = (await cookies()).get('xa92be3')?.value;
  const session = await utils.decrypt(cookie, process.env.REFRESH_TOKEN);

  // Handle path routes
  if (isProtectedRoute && !session) {
    await utils.deleteSession('xa91fe7');
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  if (ispathPublicRoute && session) {
    let redirectPath = '/dashboard/customer/overview';

    if (session.role === 'admin') {
      redirectPath = '/dashboard/admin/overview';
    } else if (session.role === 'agent') {
      redirectPath = '/dashboard/agent/overview';
    }

    if (!req.nextUrl.pathname.startsWith(redirectPath)) {
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }
  }

  // Check role-based access for path protected routes
  if (session) {
    // Admin route access check
    if (
      route.path.protected.admin.some((protectedPath) =>
        path.startsWith(protectedPath),
      ) &&
      session.role !== 'admin'
    ) {
      const redirectPath =
        session.role === 'agent'
          ? '/dashboard/agent/overview'
          : '/dashboard/customer/overview';
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }

    // Agent route access check
    if (
      route.path.protected.agent.some((protectedPath) =>
        path.startsWith(protectedPath),
      ) &&
      session.role !== 'agent'
    ) {
      const redirectPath =
        session.role === 'admin'
          ? '/dashboard/admin/overview'
          : '/dashboard/customer/overview';
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }

    // Customer route access check
    if (
      route.path.protected.customer.some((protectedPath) =>
        path.startsWith(protectedPath),
      ) &&
      session.role !== 'customer'
    ) {
      const redirectPath =
        session.role === 'admin'
          ? '/dashboard/admin/overview'
          : '/dashboard/agent/overview';
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
