'use server'
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/Article";

export async function addOrRemoveFromCleanoutBag(article: Article) {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .update({in_cleanout_bag: !article.inCleanoutBag})
        .eq('id', article.id)

    if (error) {
        console.log(error)
        return
    }
}