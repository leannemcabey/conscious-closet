'use server'

import { createClient } from "@/utils/supabase/server";

export const handleGoogleSignIn = async (response) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential
    });

    if (error !== null) {
        console.log("error: " + error)
    }

    const { user: { email, identities } } = data;

    console.log(email)
    console.log(identities[0].identity_data.name)
};