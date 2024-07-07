'use server'
import { createClient } from "@/utils/supabase/server";

export async function setSuitcaseArticles(suitcaseId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('suitcase_articles')
        .select('article_id')
        .eq('suitcase_id', suitcaseId)

    if (error) {
        console.log(error)
        return
    }

    return data?.map((articleId) => articleId.article_id)
}