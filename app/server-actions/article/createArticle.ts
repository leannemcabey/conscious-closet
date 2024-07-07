'use server'
import { NewArticleInput } from "@/types/NewArticleInput";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";

export async function createArticle(newArticle: NewArticleInput) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('articles')
            .insert([
                {
                    external_image_id: newArticle.image.imageId,
                    image_url: newArticle.image.baseUrl,
                    category: newArticle.articleCategory,
                    weather_category: newArticle.weatherCategory
                }
            ])

    if (error) {
        console.log(error)
        return
    }

    revalidatePath(`/articles/category/${newArticle.articleCategory}`)
}