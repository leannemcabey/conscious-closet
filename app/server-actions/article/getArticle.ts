'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/typeConversions/toArticle";

export async function getArticle(articleId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select().eq('id', articleId);

    return {
        article: data?.map((article) => toArticle(article))[0],
        error: error
    }
}