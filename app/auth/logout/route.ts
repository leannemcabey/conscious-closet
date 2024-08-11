'use server'

import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

export const POST = async (req: NextRequest) => {
    const supabase = createClient();

    await supabase.auth.signOut()
    return redirect('/');
};