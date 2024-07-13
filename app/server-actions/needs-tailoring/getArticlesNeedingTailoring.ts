'use server'
import { createClient } from "@/utils/supabase/server";

export async function getArticlesNeedingTailoring() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .eq('needs_tailoring', true)

    if (error) {
        console.log(error)
        return
    }

    return data;
}