'use server'

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import {redirect} from "next/navigation";

export async function GET(response) {
  // // The `/auth/callback` route is required for the server-side auth flow implemented
  // // by the SSR package. It exchanges an auth code for the user's session.
  // // https://supabase.com/docs/guides/auth/server-side/nextjs
  // const requestUrl = new URL(request.url);
  // const code = requestUrl.searchParams.get("code");
  // const origin = requestUrl.origin;
  //
  // if (code) {
  //   const supabase = createClient();
  //   await supabase.auth.exchangeCodeForSession(code);
  // }
  //
  // // URL to redirect to after sign up process completes
  // return NextResponse.redirect(`${origin}/protected`);
  console.log("in callback")

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential
  });

  if (error !== null) {
    console.log("error: " + error)
  }

  redirect('/home')
}
