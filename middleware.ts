'use server'
import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}


// /**
//  * Redirects unauthenticated users back to the auth screen
//  * */
// export async function middleware(req: NextRequest) {
//   console.log(`root middleware running`)
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({req, res})
//
//   const { data: { user } } = await supabase.auth.getUser();
//
//   console.log(`user: ${JSON.stringify(user)}`)
//
//
//   // if (user && req.nextUrl.pathname === '/') {
//   //   return NextResponse.redirect('http://localhost:3000/home') // TODO: make variable
//   // }
//
//   // TODO: this isn't playing nicely with the auth flow / redirect.
//   //  The `user` object comes back null, even though there is a session in place.
//   //  I guess because this is on the server side, while the session is on the client side.
//   //  So it tried to redirect to /home, and then does another redirect to the login page.
//   //  With this uncommented, if you refresh the page after login, you will be correctly redirected to the home page.
//   // ---------------------------------
//   // TODO: 7/20/24 now with this uncommented, i don't even seem to be able to login
//   // if (!user && req.nextUrl.pathname !== '/') {
//   //   return NextResponse.redirect(new URL('/', req.url))
//   // }
//
//   return await updateSession(req)
// }

/**
 * Middleware is run when the URL attempting to be reached matches anything in this config.
 * */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
