'use server'
import { createClient } from "@/utils/supabase/server";

export async function addArticleToSuitcase(articleId: string, suitcaseIds: string[]) {
    const supabase = createClient();

    const payload = suitcaseIds.map((suitcaseId) => {
        return {
            article_id: articleId,
            suitcase_id: suitcaseId
        }
    })

    const { data, error } = await supabase
        .from('suitcase_articles')
        .insert(payload)

    if (error) {
        console.log(error)
        return
    }

    return data;
}