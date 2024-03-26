'use client'
import * as React from "react";
import { FC } from "react";
import { useExternalScripts } from "@/hooks/useExternalScripts";
import { GET } from "@/app/auth/callback/route";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const GoogleSignIn: FC = () => {
    useExternalScripts("https://accounts.google.com/gsi/client");
    // const supabase = createClient()

    globalThis.handleGoogleSignIn = (response) => {

        // Sign in to Supabase
        GET(response)
        // supabase.auth.getSession()
        //     .then((user) => console.log(`in google sign in: ${JSON.stringify(user)}`))

            // .then(() => {
            //     console.log(`in google sign in: ${JSON.stringify(data)}`)
            //     // Set application user state
            //     // login({
            //     //     id: data.user?.id,
            //     //     googleAccessToken: data.session?.access_token,
            //     //     email: data.user?.email,
            //     // })
            // })
    }

    return (
        <div>
            <div id="g_id_onload"
                 data-client_id="582493073347-u3s5arfkmltqilea7hjud5vjdde6apu6.apps.googleusercontent.com"
                 data-context="signup"
                 data-ux_mode="popup"
                 data-callback="handleGoogleSignIn"
                 data-itp_support="true">
            </div>

            <div className="g_id_signin"
                 data-type="standard"
                 data-shape="pill"
                 data-theme="outline"
                 data-text="continue_with"
                 data-size="small"
                 data-logo_alignment="left">
            </div>
        </div>
    )
};

export default GoogleSignIn;