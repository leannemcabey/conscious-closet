'use client'
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

const GoogleSignIn = () => {
    const supabase = createClient();

    supabase.auth.onAuthStateChange((event, session) => {
        if (session && session.provider_token) {
            window.localStorage.setItem('oauth_provider_token', session.provider_token)
        }

        if (session && session.provider_refresh_token) {
            window.localStorage.setItem('oauth_provider_refresh_token', session.provider_refresh_token)
        }

        if (event === 'SIGNED_OUT') {
            window.localStorage.removeItem('oauth_provider_token')
            window.localStorage.removeItem('oauth_provider_refresh_token')
        }
    })

    const googleSignIn = () => supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            scopes: 'email profile openid https://www.googleapis.com/auth/photoslibrary.readonly',
            queryParams: {
                // access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: 'http://localhost:3000/home' // TODO: make variable
        },
    })

    return (
        <button
            className="h-fit w-100 flex flex-row py-2 px-4 bg-white rounded-md drop-shadow w-max focus:outline-none focus:ring focus:ring-violet-300"
            onClick={() => googleSignIn()}
        >
            <Image src="/google-photos-icon.png" height="40" width="40" alt="Google Photos icon"/>
            <p className="ml-4 self-center text-xl">Sign in with Google</p>
        </button>
    )
};

export default GoogleSignIn;