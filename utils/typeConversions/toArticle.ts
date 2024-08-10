import { Article, DBArticle } from "@/types/article";

export const toArticle = (dbArticle: DBArticle): Article => {
    return {
        id: dbArticle.id,
        createdAt: dbArticle.created_at,
        userId: dbArticle.user_id,
        weatherCategory: dbArticle.weather_category,
        lastWorn: dbArticle.last_worn,
        inCleanoutBag: dbArticle.in_cleanout_bag,
        needsTailoring: dbArticle.needs_tailoring,
        articleCategory: dbArticle.category,
        image: {
            imageId: dbArticle.external_image_id
        }
    } as Article
}