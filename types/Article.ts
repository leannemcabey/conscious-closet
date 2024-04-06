import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";

export interface Article {
    id: string;
    createdAt: string;
    userId: string;
    weatherCategory: WeatherCategory;
    lastWorn: string;
    inCleanoutBag: boolean;
    articleCategory: ArticleCategory;
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
    image_url: string;
}