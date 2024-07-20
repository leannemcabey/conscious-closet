import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import {createClient} from "@/utils/supabase/server";
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";

export async function updateSession(request: NextRequest){
  console.log(`root middleware running`)

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
  const supabase = createMiddlewareClient({request, response})

  const { data: { user } } = await supabase.auth.getUser();

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  console.log(`utils middleware user: ${JSON.stringify(user)}`)

  if (
      !user &&
      request.nextUrl.pathname !== "/"
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  if (
      user &&
      request.nextUrl.pathname === "/"
  ) {
    const url = request.nextUrl.clone()
    url.pathname = "/home"
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

  return response;
}
