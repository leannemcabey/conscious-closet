'use server'
import { createClient } from "@/utils/supabase/server";

export async function getSuitcases() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("suitcases")
        .select()

    if (error) {
        console.log(error)
        throw error
    }

    return data;
}