'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Article } from "@/types/Article";
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
        return
    }

    revalidatePath(`articles/${id}`);
    revalidatePath(`/articles/category/${articleCategory}`);
    revalidatePath(`/articles/category/${article.weatherCategory}`);
    revalidatePath(`/cleanout-bag`);
    // redirect(`/articles/category/${articleCategory}`);
}