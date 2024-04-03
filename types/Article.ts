import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import {GooglePhotoMetadata} from "@/types/GooglePhotoMetadata";

export interface Article {
    id: string;
    createdAt: string;
    userId: string;
    weatherCategory: WeatherCategory;
    lastWorn: string;
    inCleanoutBag: boolean;
    articleType: ArticleCategory;
    image: GooglePhotoMetadata;
}