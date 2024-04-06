import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import { ArticleCategory } from "@/types/enums/ArticleCategory";

export interface NewArticleInput {
    image: GooglePhotoMetadata;
    articleCategory: ArticleCategory;
    weatherCategory: WeatherCategory;
}