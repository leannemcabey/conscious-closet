import { createContext, Dispatch, SetStateAction } from "react";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { ArticleCategory } from "@/types/enums/ArticleCategory";

export interface FilterSettings {
    showCleanoutBagItems: boolean,
    selectedWeatherCategories?: WeatherCategory[],
    selectedArticleCategories?: ArticleCategory[]
}

interface FilterContext {
    filterSettings: FilterSettings,
    setFilterSettings: Dispatch<SetStateAction<FilterSettings>>;
}

export const ArticleFilterContext = createContext<FilterContext | null>(null);