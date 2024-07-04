'use server'
import { createClient } from "@/utils/supabase/server";

export async function addOrRemoveArticleToSuitcase(
    articleId: string,
    unsavedSuitcaseIds: string[],
    savedSuitcaseIds: string[]
) {
    console.log(`suitcaseIds: ${unsavedSuitcaseIds}`)
    const supabase = createClient();

    interface insertPayloadType {
        article_id: string,
        suitcase_id: string
    }

    let insertPayload: insertPayloadType[] = [];
    let deletePayload: string[] = [];

    // `unsavedSuitcaseIds` will include those that have already been written to the database previously,
    // so they need to be de-duped. Otherwise, the entire database transaction will fail.
    // Find the new ids that haven't already been written to the database.
    unsavedSuitcaseIds.forEach((id) => {
        if (!savedSuitcaseIds?.includes(id)) {
            insertPayload.push({
                article_id: articleId,
                suitcase_id: id
            })
        }
    })

    // Any ids in `savedSuitcaseIds` that are not in `unsavedSuitcaseIds` needs to be deleted,
    // because it was deselected by the user.
    savedSuitcaseIds?.forEach((id) => {
        if (!unsavedSuitcaseIds.includes(id)) {
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