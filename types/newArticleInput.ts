import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";

export interface NewArticleInput {
    image: GooglePhotoMetadata;
    articleCategory: ArticleCategoryEnum;
    weatherCategory: WeatherCategoryEnum;
}