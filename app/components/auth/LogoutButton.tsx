'use client'
import TextButton from "@/app/components/buttons/TextButton";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = () => {
        return supabase.auth.signOut()
            .then(() => router.push("/"))
    }

    return (
        <TextButton disabled={false} handleClick={handleSignOut}>
            sign out
        </TextButton>
    )
}


