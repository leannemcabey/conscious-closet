'use server'
import { createClient } from "@/utils/supabase/server";

export async function getSuitcase(suitcaseId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("suitcases")
        .select()
        .eq('id', suitcaseId)

    if (error) {
        console.log(error)
        return
    }

    return data;
}