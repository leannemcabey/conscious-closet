import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from "@/utils/supabase/server";

export async function updateSession(req: NextRequest) {
  console.log('middleware running')
  console.log(`vercel_env: ${process.env.VERCEL_URL}`)

  let res = NextResponse.next({request: req,})

  const supabase = createClient()

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const { data: { user } } = await supabase.auth.getUser();

  // If the user is not logged in, and they're trying to reach anything other than the auth callback
  // or the login page, redirect them to the login page.
  if (!user && !req.nextUrl.pathname.startsWith('/auth/callback') && req.nextUrl.pathname !== '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // If the user is logged in, and they try to reach the login page, redirect them to the home page
  if (user && req.nextUrl.pathname === '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/home'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return res
}