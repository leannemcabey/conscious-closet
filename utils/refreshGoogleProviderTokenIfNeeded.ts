'use client'
import { refreshGoogleProviderTokenWithRetry } from "@/app/googleService/server/refreshGoogleProviderToken";
import { createClient } from "@/utils/supabase/client";

export const refreshGoogleProviderTokenIfNeededWithRetry = async () => {
    let attemptCounter = 0;
    return await refreshGoogleProviderTokenIfNeeded(attemptCounter);
}

const refreshGoogleProviderTokenIfNeeded = async (attemptCounter: number) => {
    attemptCounter++

    const supabase = createClient();

    const providerTokenExpires = parseInt(window.localStorage.getItem('expires_at')) || 0;

    // Get the current timestamp in seconds
    const now = Math.round(Date.now() / 1000);
    const isExpired = now > providerTokenExpires;

    if (isExpired) {
        console.log("refreshing google token")
        const refreshToken =  window.localStorage.getItem('oauth_provider_refresh_token');

        return refreshGoogleProviderTokenWithRetry(refreshToken)
            .then(({ token, expiresIn }) => {
                console.log(`successfully refreshed google token`)
                window.localStorage.setItem('oauth_provider_token', token);
                window.localStorage.setItem('expires_at', (now + expiresIn).toString())
                return token;
            })
            .catch((error) => {
                console.log(`error refreshing token: ${error}`)
                if (attemptCounter > 2) {
                    console.log('max attempts for refreshing token reached. should redirect to login')
                    return supabase.auth.signOut()
                } else {
                    refreshGoogleProviderTokenIfNeeded(attemptCounter)
                }
            })
    } else {
        console.log(`returning original unexpired token`)
        return window.localStorage.getItem('oauth_provider_token');
    }
}