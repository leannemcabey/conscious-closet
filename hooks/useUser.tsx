import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

export const useUser = () => {
    const supabase = createClient();
    const [user, setUser] = useState<User>({})

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getSession()
            setUser({
                id: data.session?.user.id,
                googleAccessToken: data.session?.access_token,
                email: data.session?.user.email
            })
        }
        getUser()
    }, [])

    return user;
}