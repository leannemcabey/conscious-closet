'use server'

import { createClient } from "@/utils/supabase/client";

export const handleGoogleSignIn = async (response) => {
    const supabase = createClient();

    console.log("inside handleGoogleSignIn")
    console.log(JSON.stringify(response))

    const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential
    });

    if (error !== null) {
        console.log("error: " + error)
    } else {
        console.log(JSON.stringify(data))
    }
};

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
//
// import { createClient } from '@/utils/supabase/server'
//
// export async function login(formData: FormData) {
//     const supabase = createClient()
//
//     // type-casting here for convenience
//     // in practice, you should validate your inputs
//     const data = {
//         email: formData.get('email') as string,
//         password: formData.get('password') as string,
//     }
//
//     const { error } = await supabase.auth.signInWithPassword(data)
//
//     if (error) {
//         redirect('/error')
//     }
//
//     revalidatePath('/', 'layout')
//     redirect('/')
// }
//
// export async function signup(formData: FormData) {
//     const supabase = createClient()
//
//     // type-casting here for convenience
//     // in practice, you should validate your inputs
//     const data = {
//         email: formData.get('email') as string,
//         password: formData.get('password') as string,
//     }
//
//     const { error } = await supabase.auth.signUp(data)
//
//     if (error) {
//         redirect('/error')
//     }
//
//     revalidatePath('/', 'layout')
//     redirect('/')
// }