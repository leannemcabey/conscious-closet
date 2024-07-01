'use server'
import { createClient } from "@/utils/supabase/server";
import { getArticleSuitcases } from "@/app/server-actions/getArticleSuitcases";

export async function addOrRemoveArticleToSuitcase(articleId: string, suitcaseIds: string[]) {
    console.log(`suitcaseIds: ${suitcaseIds}`)
    const supabase = createClient();

    interface insertPayloadType {
        article_id: string,
        suitcase_id: string
    }

    let insertPayload: insertPayloadType[] = [];
    let deletePayload: string[] = [];

    const alreadySelectedSuitcases = await getArticleSuitcases(articleId);

    // `suitcaseIds` will include those that have already been written to the database previously,
    // so they need to be de-duped. Otherwise, the entire database transaction will fail.
    // Find the new ids that haven't already been written to the database.
    suitcaseIds.forEach((id) => {
        if (!alreadySelectedSuitcases?.includes(id)) {
            insertPayload.push({
                article_id: articleId,
                suitcase_id: id
            })
        }
    })

    // Any ids in `alreadySelectedSuitcases` that are not in `suitcaseIds` needs to be deleted,
    // because it was deselected by the user.
    alreadySelectedSuitcases?.forEach((id) => {
        if (!suitcaseIds.includes(id)) {
            deletePayload.push(id)
        }
    })

    const { error: insertError } = await supabase
        .from('suitcase_articles')
        .insert(insertPayload)

    const { error: deleteError } = await supabase
        .from('suitcase_articles')
        .delete()
        .in('suitcase_id', deletePayload)

    const { data, error: fetchError } = await supabase
        .from('suitcase_articles')
        .select('suitcase_id')
        .eq('article_id', articleId)

    if (insertError) {
        console.log(insertError)
        return
    }

    if (deleteError) {
        console.log(deleteError)
        return
    }

    if (fetchError) {
        console.log(fetchError)
        return
    }

    return data;
}