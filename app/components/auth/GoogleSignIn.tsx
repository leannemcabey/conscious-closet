'use client'
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

interface GoogleSignInProps {
    defaultUrl: string;
}

const GoogleSignIn = ({ defaultUrl }: GoogleSignInProps) => {
    const supabase = createClient();

    const googleSignIn = () => supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            scopes: 'email profile openid https://www.googleapis.com/auth/photoslibrary.readonly',
            queryParams: {
                access_type: 'offline',
                prompt: 'consent',
            },
            redirectTo: `${defaultUrl}/auth/callback`
        },
    })

    return (
        <button
            className="h-fit w-100 flex flex-row py-2 px-4 bg-white rounded-lg drop-shadow w-max focus:outline-none focus:ring focus:ring-violet-300"
            onClick={() => googleSignIn()}
        >
            <Image src="/google-photos-icon.png" height="40" width="40" alt="Google Photos icon"/>
            <p className="ml-4 self-center text-xl">Sign in with Google</p>
        </button>
    )
};

export default GoogleSignIn;