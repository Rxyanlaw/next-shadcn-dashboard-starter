import { authMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/auth(.*)'],
  afterAuth(auth, req) {
    // Handle the root path
    if (req.nextUrl.pathname === '/') {
      // If the user is authenticated, redirect to dashboard
      if (auth.userId) {
        return NextResponse.redirect(new URL('/dashboard/overview', req.url));
      }
      // If the user is not authenticated, redirect to sign in
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    // Handle the dashboard root path
    if (req.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/dashboard/overview', req.url));
    }

    // For protected routes, ensure the user is authenticated
    if (!auth.userId && !req.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};