'use server'
import { createClient } from "@/utils/supabase/server";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { revalidatePath } from "next/cache";
import { Article } from "@/types/Article";

export async function updateArticleWeatherCategory(article: Article, weatherCategory: WeatherCategory) {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .update({weather_category: weatherCategory})
        .eq('id', article.id)

    if (error) {
        console.log(error)
        return
    }

    revalidatePath(`/articles/${article.id}`);
    revalidatePath(`/articles/category/${article.articleCategory}`)
    revalidatePath(`/articles/category/${article.weatherCategory}`)
}