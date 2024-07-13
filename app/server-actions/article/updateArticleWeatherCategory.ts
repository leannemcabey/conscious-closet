'use server'
import { createClient } from "@/utils/supabase/server";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { revalidatePath } from "next/cache";
import { Article } from "@/types/article";

export async function updateArticleWeatherCategory(article: Article, weatherCategory: WeatherCategoryEnum) {
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