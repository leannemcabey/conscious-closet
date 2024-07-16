'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/typeConversions/toArticle";

export async function getArticlesInCleanoutBag() {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .eq('in_cleanout_bag', true)

    if (error) {
        console.log(error)
        return
    }

    return data?.map((article) => toArticle(article)) ?? [];
}