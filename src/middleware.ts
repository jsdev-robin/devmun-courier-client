import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import SessionManager from './lib/SessionManager';

const route = {
  path: {
    protected: {
      admin: ['/dashboard/admin'],
      agent: ['/dashboard/agent'],
      customer: ['/your/dashboard'],
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

  // Check for all protected routes
  const isProtectedRoute =
    route.path.protected.admin.some((p) => path.startsWith(p)) ||
    route.path.protected.agent.some((p) => path.startsWith(p)) ||
    route.path.protected.customer.some((p) => path.startsWith(p));

  const isPublicRoute = route.path.public.includes(path);

  // Get both cookies (admin/agent + customer)
  const cookieStore = await cookies();
  const adminAgentCookie = cookieStore.get('xa92be3')?.value;
  const customerCookie = cookieStore.get('xb81cd2')?.value;

  let session = null;

  // Try admin/agent cookie first
  if (adminAgentCookie) {
    session = await utils.decrypt(adminAgentCookie, process.env.REFRESH_TOKEN!);
  }

  // If no admin/agent session, try customer cookie
  if (!session && customerCookie) {
    session = await utils.decrypt(customerCookie, process.env.REFRESH_TOKEN!);
  }

  //Case 1: No session but protected route → redirect to sign-in
  if (!session && isProtectedRoute) {
    await utils.deleteSession('xa91fe7'); // admin/agent
    await utils.deleteSession('xb82ef9'); // customer
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }

  //Case 2: Has session but on public route → redirect to dashboard
  if (session && isPublicRoute) {
    let redirectPath = '/';

    if (session.role === 'admin') redirectPath = '/dashboard/admin/overview';
    else if (session.role === 'agent')
      redirectPath = '/dashboard/agent/overview';
    else if (session.role === 'customer') redirectPath = '/your/dashboard';

    return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
  }

  //Case 3: Has session but wrong role access → redirect to correct dashboard
  if (session) {
    // Admin area - only for admin
    if (path.startsWith('/dashboard/admin') && session.role !== 'admin') {
      const redirectPath =
        session.role === 'agent'
          ? '/dashboard/agent/overview'
          : '/your/dashboard';
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }

    // Agent area - only for agent
    if (path.startsWith('/dashboard/agent') && session.role !== 'agent') {
      const redirectPath =
        session.role === 'admin'
          ? '/dashboard/admin/overview'
          : '/your/dashboard';
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }

    // Customer area - only for customer
    if (path.startsWith('/your/dashboard') && session.role !== 'customer') {
      const redirectPath =
        session.role === 'admin'
          ? '/dashboard/admin/overview'
          : '/dashboard/agent/overview';
      return NextResponse.redirect(new URL(redirectPath, req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
