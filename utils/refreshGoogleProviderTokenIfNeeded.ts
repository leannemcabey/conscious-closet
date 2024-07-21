'use client'
import { refreshGoogleProviderToken } from "@/app/server-actions/googleAPI/refreshGoogleProviderToken";
import { createClient } from "@/utils/supabase/client";

export const refreshGoogleProviderTokenIfNeeded = async () => {
    const supabase = createClient();

    const providerTokenExpires = window.localStorage.getItem('expires_at');

    // Get the current timestamp in seconds
    const now = Math.round(Date.now() / 1000);
    const isExpired = now > providerTokenExpires;

    if (isExpired) {
        console.log("refreshing google token")
        const refreshToken =  window.localStorage.getItem('oauth_provider_refresh_token');

        refreshGoogleProviderToken(refreshToken)
            .then((token) => {
                window.localStorage.setItem('oauth_provider_token', token)
                return token;
            })
            .catch(() => supabase.auth.signOut()) // TODO: haven't been able to confirm that this works yet
    }

    return window.localStorage.getItem('oauth_provider_token');
}