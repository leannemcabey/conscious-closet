'use client'
import { refreshGoogleProviderToken } from "@/app/googleService/server/refreshGoogleProviderToken";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

let attemptCounter = 0;

export const refreshGoogleProviderTokenIfNeeded = async () => {
    attemptCounter++

    const supabase = createClient();

    const providerTokenExpires = parseInt(window.localStorage.getItem('expires_at')) || 0;

    // Get the current timestamp in seconds
    const now = Math.round(Date.now() / 1000);
    const isExpired = now > providerTokenExpires;

    if (isExpired) {
        console.log("refreshing google token")
        const refreshToken =  window.localStorage.getItem('oauth_provider_refresh_token');

        refreshGoogleProviderToken(refreshToken)
            .then(({ token, expiresIn }) => {
                window.localStorage.setItem('oauth_provider_token', token);
                window.localStorage.setItem('expires_at', (now + expiresIn).toString())
                return token;
            })
            .catch(() => {
                if (attemptCounter > 1) {
                    return supabase.auth.signOut()
                        .then(() => redirect("/"))
                } else {
                    refreshGoogleProviderTokenIfNeeded()
                }
            })
    }

    return window.localStorage.getItem('oauth_provider_token');
}