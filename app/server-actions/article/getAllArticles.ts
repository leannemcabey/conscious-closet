'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/typeConversions/toArticle";

export async function getAllArticles() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .eq('image_deleted_from_google_photos', false);

    if (error) {
        console.log(error)
        throw error
    }

    return data?.map((article) => toArticle(article)) || [];
}