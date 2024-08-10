'use client'
import { refreshGoogleProviderTokenWithRetry } from "@/app/googleService/server/refreshGoogleProviderToken";
import { createClient } from "@/utils/supabase/client";
import {AuthError} from "@supabase/auth-js";

export const refreshGoogleProviderTokenIfNeededWithRetry = async () => {
    let attemptCounter = 0;
    return await refreshGoogleProviderTokenIfNeeded(attemptCounter);
}

const refreshGoogleProviderTokenIfNeeded = async (attemptCounter: number): Promise<string | undefined> => {
    attemptCounter++

    const supabase = createClient();

    const originalProviderToken = window.localStorage.getItem('oauth_provider_token');
    const providerTokenExpires = parseInt(window.localStorage.getItem('expires_at') || "0");

    // Get the current timestamp in seconds
    const now = Math.round(Date.now() / 1000);
    const isExpired = now > providerTokenExpires;

    if (isExpired) {
        console.log("refreshing google token")
        const refreshToken =  window.localStorage.getItem('oauth_provider_refresh_token');

        if (refreshToken) {
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
                            .then(() => undefined)
                    } else {
                        return refreshGoogleProviderTokenIfNeeded(attemptCounter)
                    }
                })
        } else {
            console.log(`no refresh token present`)
            return supabase.auth.signOut()
                .then(() => undefined)
        }
    } else if (originalProviderToken) {
        console.log(`returning original unexpired token`)
        return originalProviderToken;
    } else {
        console.log(`no tokens present`)
        return supabase.auth.signOut()
            .then(() => undefined)
    }
}