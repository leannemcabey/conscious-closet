'use server'
import { createClient } from "@/utils/supabase/server";

export async function markArticleWornDate(articleId: string, date: Date) {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .update({last_worn: date})
        .eq('id', articleId)

    if (error) {
        console.log(error)
        return
    }
}