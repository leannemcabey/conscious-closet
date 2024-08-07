'use server'
import { createClient } from "@/utils/supabase/server";

export async function getArticleSuitcaseIds(articleId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('suitcase_articles')
        .select('suitcase_id')
        .eq('article_id', articleId)

    if (error) {
        console.log(error)
        throw error
    }

    return data?.map((s) => s.suitcase_id)
}