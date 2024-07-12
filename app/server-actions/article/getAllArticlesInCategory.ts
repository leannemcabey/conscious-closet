'use server'
import { createClient } from "@/utils/supabase/server";

export async function getAllArticlesInCategory(categoryId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .eq('category', categoryId);

    if (error) {
        console.log(error)
        return
    }

    return data;
}