'use server'
import { createClient } from "@/utils/supabase/server";

export async function getAllArticles() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()

    if (error) {
        console.log(error)
        return
    }

    return data;
}