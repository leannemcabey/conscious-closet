import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

createClient().auth.onAuthStateChange((event, session) => {
    if (session && session.provider_token) {
        window.localStorage.setItem('oauth_provider_token', session.provider_token)
    }

    if (session && session.provider_refresh_token) {
        window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
    }

    if (session && session.expires_at) {
        window.localStorage.setItem('expires_at', session.expires_at.toString())
    }

    if (event === 'SIGNED_OUT') {
        window.localStorage.removeItem('oauth_provider_token')
        window.localStorage.removeItem('oauth_provider_refresh_token')
    }
})
