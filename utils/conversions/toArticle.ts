import { Article, DBArticle } from "@/types/Article";

export const toArticle = (dbArticle: DBArticle): Article => {
    if (dbArticle) {
        return {
            id: dbArticle.id,
            createdAt: dbArticle.created_at,
            userId: dbArticle.user_id,
            weatherCategory: dbArticle.weather_category,
            lastWorn: dbArticle.last_worn,
            inCleanoutBag: dbArticle.in_cleanout_bag,
            articleCategory: dbArticle.category,
            image: {
                imageId: dbArticle.external_image_id
            }
        } as Article
    }
}