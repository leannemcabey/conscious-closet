'use server'
import { createClient } from "@/utils/supabase/server";

export async function addArticleToSuitcase(articleId: string, suitcaseId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('suitcase_articles')
        .insert([
            {
                article_id: articleId,
                suitcase_id: suitcaseId
            }
        ])

    if (error) {
        console.log(error)
        return
    }

    return data;
}