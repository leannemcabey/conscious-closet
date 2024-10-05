'use server'
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Article } from "@/types/article";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";

export async function updateArticleCategories(
    article: Article,
    newArticleCategory: ArticleCategoryEnum,
    newWeatherCategory: WeatherCategoryEnum
) {
    const supabase = createClient();

    const originalArticleCategory = article.articleCategory;
    const originalWeatherCategory = article.weatherCategory;

    const determineValuesToUpdate = () => {
        const newValues = {};

        if (originalArticleCategory !== newArticleCategory) newValues['category'] = newArticleCategory;
        if (originalWeatherCategory !== newWeatherCategory) newValues['weather_category'] = newWeatherCategory;

        return newValues;
    };

    const valuesToUpdate = determineValuesToUpdate();

    const { error } = await supabase
        .from('articles')
        .update(valuesToUpdate)
        .eq('id', article.id)

    if (error) {
        console.log(error)
        throw error
    }

    revalidatePath(`/articles/${article.id}`);
    revalidatePath(`/articles/category/${newArticleCategory}`);
    revalidatePath(`/articles/category/${originalArticleCategory}`);
    revalidatePath(`/articles/category/${newWeatherCategory}`);
    revalidatePath(`/articles/category/${originalWeatherCategory}`);
}