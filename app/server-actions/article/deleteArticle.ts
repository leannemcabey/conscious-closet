'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Article } from "@/types/Article";

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

    redirect(`/articles/category/${articleCategory}`)
}