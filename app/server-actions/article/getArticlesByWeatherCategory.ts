'use server'
import { createClient } from "@/utils/supabase/server";
import {toArticle} from "@/utils/typeConversions/toArticle";

export async function getArticlesByWeatherCategory(weatherCategoryId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .eq('weather_category', weatherCategoryId);

    if (error) {
        console.log(error)
        return
    }

    return data?.map((article) => toArticle(article)) ?? []
}