'use client'

import { createClient } from '@/utils/supabase/client';
import { LogoutButton } from "@/components/auth/LogoutButton";

export default async function Home() {
    const supabase = createClient();
    // const { data: articleTypes } = await supabase.from("article_types").select();

    // console.log(JSON.stringify(articleTypes))

    return (
        <>
            <h1>Conscious Closet</h1>
            <LogoutButton />
        </>
    )
}