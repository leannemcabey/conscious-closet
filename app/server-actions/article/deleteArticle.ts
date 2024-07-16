'use server'
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/article";
import { revalidatePath } from "next/cache";

export async function deleteArticle(article: Article) {
    const supabase = createClient();
    const { articleCategory, id } = article;

    const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id)

    if (error) {
        console.log(error)
        throw error
    }

    revalidatePath(`articles/${id}`);
    revalidatePath(`/articles/category/${articleCategory}`);
    revalidatePath(`/articles/category/${article.weatherCategory}`);
    revalidatePath(`/cleanout-bag`);
}