import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from "@/utils/supabase/server";

export async function updateSession(req: NextRequest) {
  console.log('middleware running')

  let res = NextResponse.next({
    request: req,
  })

  // This seems to work whether it's the middlewareClient or server client
  const supabase = createClient()

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // This is null right after logging in
  // it only returns a value once you refresh the page
  const { data: { user } } = await supabase.auth.getUser();

  // console.log(`user: ${JSON.stringify(user)}`)

  if (!user && !req.nextUrl.pathname.startsWith('/auth/callback') && req.nextUrl.pathname !== '/') {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (user && req.nextUrl.pathname === '/') {
    console.log("user logged in, redirecting to home")
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