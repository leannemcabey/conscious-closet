'use server'
import { createClient } from "@/utils/supabase/server";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { revalidatePath } from "next/cache";

export async function updateArticleWeatherCategory(articleId: string, weatherCategory: WeatherCategory) {
    const supabase = createClient();

    const { error } = await supabase
        .from('articles')
        .update({weather_category: weatherCategory})
        .eq('id', articleId)

    if (error) {
        console.log(error)
        return
    }

    revalidatePath(`/articles/${articleId}`);
}