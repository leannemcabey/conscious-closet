'use client'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Article } from "@/types/Article";
import WeatherFilter from "@/app/components/articles/filter/WeatherFilter";
import CleanoutBagFilter from "@/app/components/articles/filter/CleanoutBagFilter";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import CategoryFilter from "@/app/components/articles/filter/CategoryFilter";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import { ArticleFilterContext } from "@/app/context/ArticleFilterContext";

export enum FilterType {
    "cleanout",
    "weather",
    "category"
}

interface ArticleFiltersProps {
    filterTypes: FilterType[];
}

const ArticleFilters = ({ filterTypes }: ArticleFiltersProps) => {
    const { filterSettings, setFilterSettings } = useContext(ArticleFilterContext);
    const [showCleanoutBagItems, setShowCleanoutBagItems] = useState<boolean>(filterSettings.showCleanoutBagItems);
    const [selectedWeatherCategories, setSelectedWeatherCategories] = useState<WeatherCategory[]>(filterSettings.selectedWeatherCategories);
    const [selectedArticleCategories, setSelectedArticleCategories] = useState<ArticleCategory[]>(filterSettings.selectedArticleCategories);

    useEffect(() => {
        setFilterSettings({
            showCleanoutBagItems: showCleanoutBagItems,
            selectedWeatherCategories: selectedWeatherCategories,
            selectedArticleCategories: selectedArticleCategories
        });
    }, [showCleanoutBagItems, selectedWeatherCategories, selectedArticleCategories]);

    return (
        <div className="mb-4 px-1 py-2 flex place-content-between border border-theme-blue border-dotted rounded-md drop-shadow">
            {filterTypes.includes(FilterType.cleanout) &&
                <CleanoutBagFilter showCleanoutBagItems={showCleanoutBagItems} setShowCleanoutBagItems={setShowCleanoutBagItems} />
            }

            {filterTypes.includes(FilterType.weather) &&
                <WeatherFilter selectedWeatherCategories={selectedWeatherCategories} setSelectedWeatherCategories={setSelectedWeatherCategories} />
            }

            {filterTypes.includes(FilterType.category) &&
                <CategoryFilter selectedArticleCategories={selectedArticleCategories} setSelectedArticleCategories={setSelectedArticleCategories} />
            }
        </div>
    )
}

export default ArticleFilters;