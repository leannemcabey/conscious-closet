'use server'
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

// I'm leaving this here for reference, but this route is no longer in use.
// Because it runs on the server side, the supabase client it uses is not
// able to clear local storage of all token-related data. This may have been
// causing issues of stale tokens, or even fresh tokens with a stale expiration
export const POST = async (req: NextRequest) => {
    const supabase = createClient();

    await supabase.auth.signOut()
    return redirect('/');
};