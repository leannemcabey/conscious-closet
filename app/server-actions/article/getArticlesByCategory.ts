'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/typeConversions/toArticle";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";

export async function getArticlesByCategory(category: ArticleCategoryEnum) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("articles")
        .select()
        .eq('category', category)
        .eq('image_deleted_from_google_photos', false);

    return {
        articles: data?.map((article) => toArticle(article)),
        error: error
    }
}