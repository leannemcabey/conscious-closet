'use server'
import { NewArticleInput } from "@/types/NewArticleInput";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";
import {toArticle} from "@/utils/conversions/toArticle";

export async function createArticle(newArticle: NewArticleInput) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('articles')
        .insert([
            {
                external_image_id: newArticle.image.imageId,
                category: newArticle.articleCategory,
                weather_category: newArticle.weatherCategory
            }
        ])
        .select()

    if (error) {
        console.log(error)
        throw error
    }

    revalidatePath(`/articles/category/${newArticle.articleCategory}`)

    if (data) {
        return toArticle(data[0]);
    }
}