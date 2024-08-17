'use client'
import { useContext, useEffect, useState } from "react";
import WeatherFilter from "@/app/components/filter/WeatherFilter";
import CleanoutBagFilter from "@/app/components/filter/CleanoutBagFilter";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import CategoryFilter from "@/app/components/filter/CategoryFilter";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
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
    const { filterSettings, setFilterSettings } = useContext(ArticleFilterContext)!!;
    const [showCleanoutBagItems, setShowCleanoutBagItems] = useState<boolean>(filterSettings.showCleanoutBagItems);
    const [selectedWeatherCategories, setSelectedWeatherCategories] = useState<WeatherCategoryEnum[] | undefined>(filterSettings.selectedWeatherCategories);
    const [selectedArticleCategories, setSelectedArticleCategories] = useState<ArticleCategoryEnum[] | undefined>(filterSettings.selectedArticleCategories);

    useEffect(() => {
        setFilterSettings({
            showCleanoutBagItems: showCleanoutBagItems,
            selectedWeatherCategories: selectedWeatherCategories,
            selectedArticleCategories: selectedArticleCategories
        });
    }, [showCleanoutBagItems, selectedWeatherCategories, selectedArticleCategories]);

    return (
        <div className="mb-1 px-1 py-2 flex place-content-between items-center bg-background-green border border-theme-green border-dotted rounded-lg drop-shadow">
            {filterTypes.includes(FilterType.cleanout) &&
                <CleanoutBagFilter showCleanoutBagItems={showCleanoutBagItems} setShowCleanoutBagItems={setShowCleanoutBagItems} />
            }

            {filterTypes.includes(FilterType.weather) &&
                <WeatherFilter selectedWeatherCategories={selectedWeatherCategories!!} setSelectedWeatherCategories={setSelectedWeatherCategories} />
            }

            {filterTypes.includes(FilterType.category) &&
                <CategoryFilter selectedArticleCategories={selectedArticleCategories!!} setSelectedArticleCategories={setSelectedArticleCategories} />
            }
        </div>
    )
}

export default ArticleFilters;