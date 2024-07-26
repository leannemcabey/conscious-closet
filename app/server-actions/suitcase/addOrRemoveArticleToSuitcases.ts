'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getArticleSuitcaseIds } from "@/app/server-actions/suitcase/getArticleSuitcaseIds";
import {
    getInsertPayloadForArticleSuitcases
} from "@/app/server-actions/suitcase/utils/getInsertPayloadForArticleSuitcases";
import {
    getDeletePayloadForArticleSuitcases
} from "@/app/server-actions/suitcase/utils/getDeletePayloadForArticleSuitcases";

export async function addOrRemoveArticleToSuitcases(
    articleId: string,
    unsavedSuitcaseIds: string[],
    savedSuitcaseIds: string[]
) {
    const supabase = createClient();

    const insertPayload = getInsertPayloadForArticleSuitcases(articleId, unsavedSuitcaseIds, savedSuitcaseIds);
    const deletePayload = getDeletePayloadForArticleSuitcases(unsavedSuitcaseIds, savedSuitcaseIds);

    const { error: insertError } = await supabase
        .from('suitcase_articles')
        .insert(insertPayload)

    if (insertError) {
        console.log(insertError)
        throw insertError
    }

    const { error: deleteError } = await supabase
        .from('suitcase_articles')
        .delete()
        .eq('article_id', articleId)
        .in('suitcase_id', deletePayload)

    if (deleteError) {
        console.log(deleteError)
        throw deleteError
    }

    const suitcaseIds = await getArticleSuitcaseIds(articleId);

    insertPayload.forEach((insert) => {
        revalidatePath(`/suitcases/${insert.suitcase_id}`)
    })

    deletePayload.forEach((id) => {
        revalidatePath(`/suitcases/${id}`)
    })

    return suitcaseIds;
}