import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";

export interface Article {
    id: string;
    createdAt: string;
    userId: string;
    weatherCategory: WeatherCategoryEnum;
    lastWorn: string;
    inCleanoutBag: boolean;
    articleCategory: ArticleCategoryEnum;
    image: GooglePhotoMetadata;
}

export interface DBArticle {
    id: string;
    created_at: string;
    user_id: string;
    weather_category: string;
    last_worn?: string;
    in_cleanout_bag: boolean;
    external_image_id: string;
    category: string;
}