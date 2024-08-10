import { createContext, Dispatch, SetStateAction } from "react";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";

export interface FilterSettings {
    showCleanoutBagItems: boolean,
    selectedWeatherCategories?: WeatherCategoryEnum[],
    selectedArticleCategories?: ArticleCategoryEnum[]
}

interface FilterContext {
    filterSettings: FilterSettings,
    setFilterSettings: Dispatch<SetStateAction<FilterSettings>>;
}

export const ArticleFilterContext = createContext<FilterContext | undefined>(undefined);