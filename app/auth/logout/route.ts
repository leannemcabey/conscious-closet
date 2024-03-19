'use server'

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const supabase = createClient();

    await supabase.auth.signOut()
    return NextResponse.redirect(new URL('/', req.url))
};