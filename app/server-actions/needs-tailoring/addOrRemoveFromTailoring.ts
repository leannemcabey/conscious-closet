'use server'
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/article";
import { revalidatePath } from "next/cache";

export async function addOrRemoveFromTailoring(article: Article) {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .update({needs_tailoring: !article.needsTailoring})
        .eq('id', article.id)

    if (error) {
        console.log(error)
        return
    }

    revalidatePath('/needs-tailoring');
}