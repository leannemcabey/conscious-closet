'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getArticleSuitcaseIds } from "@/app/server-actions/suitcase/getArticleSuitcaseIds";
import {
    getInsertPayloadForArticleSuitcases
} from "@/app/server-actions/suitcase/utils/getInsertPayloadForArticleSuitcases";

async function addArticleToSuitcases(
    articleId: string,
    unsavedSuitcaseIds: string[]
) {
    const supabase = createClient();

    const savedSuitcaseIds = await getArticleSuitcaseIds(articleId)
    const insertPayload = getInsertPayloadForArticleSuitcases(articleId, unsavedSuitcaseIds, savedSuitcaseIds || []);

    const { error: insertError } = await supabase
        .from('suitcase_articles')
        .insert(insertPayload)

    if (insertError) {
        console.log(insertError)
        throw insertError
    }

    insertPayload.forEach((insert) => {
        revalidatePath(`/suitcases/${insert.suitcase_id}`)
    })
}

export async function addArticlesToSuitcases(articleIds: (string | undefined)[], unsavedSuitcaseIds: string[]) {
    const dedupedArticleIds = Array.from(new Set(articleIds))

    await dedupedArticleIds.forEach((articleId) => {
        if (articleId) {
            addArticleToSuitcases(articleId, unsavedSuitcaseIds)
        }
    })
}