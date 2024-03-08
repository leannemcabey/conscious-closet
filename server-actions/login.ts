'use server'

import { createClient } from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

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
    await findOrAddUser(email, identities[0].identity_data.name);

    revalidatePath('/home');

    return { message: 'Success' };
};

const findOrAddUser = async (email: string, name: string) => {
    const supabase = createClient();

    const { data: existingUser, error: selectUserError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)

    if (!existingUser) {
        const { data: newUser, error: insertUserError } = await supabase
            .from('users')
            .insert([{
                name,
                email
            }])
    }
}