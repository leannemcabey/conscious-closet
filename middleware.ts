import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

/**
 * Redirects unauthenticated users back to the auth screen
 * */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({req, res})

  const { data: { user } } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === '/') {

    return NextResponse.redirect(new URL('/home', req.url))
  }
  if (!user && req.nextUrl.pathname !== '/') {

    return NextResponse.redirect(new URL('/', req.url))
  }

  return await updateSession(req)
}

/**
 * Middleware is run when the URL attempting to be reached matches anything in this config.
 * */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
