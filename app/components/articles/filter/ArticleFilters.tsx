'use client'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Article } from "@/types/Article";
import WeatherFilter from "@/app/components/articles/filter/WeatherFilter";
import CleanoutBagFilter from "@/app/components/articles/filter/CleanoutBagFilter";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import CategoryFilter from "@/app/components/articles/filter/CategoryFilter";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import { ArticleFilterContext } from "@/app/context/ArticleFilterContext";

export enum FilterTypes {
    "cleanout",
    "weather",
    "category"
}

interface ArticleFiltersProps {
    appliedFilters: FilterTypes[];
}

const ArticleFilters = ({ appliedFilters }: ArticleFiltersProps) => {
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
            {appliedFilters.includes(FilterTypes.cleanout) &&
                <CleanoutBagFilter showCleanoutBagItems={showCleanoutBagItems} setShowCleanoutBagItems={setShowCleanoutBagItems} />
            }

            {appliedFilters.includes(FilterTypes.weather) &&
                <WeatherFilter selectedWeatherCategories={selectedWeatherCategories} setSelectedWeatherCategories={setSelectedWeatherCategories} />
            }

            {appliedFilters.includes(FilterTypes.category) &&
                <CategoryFilter selectedArticleCategories={selectedArticleCategories} setSelectedArticleCategories={setSelectedArticleCategories} />
            }
        </div>
    )
}

export default ArticleFilters;