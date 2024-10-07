'use client'
import { useContext, useEffect, useState } from "react";
import WeatherFilter from "@/app/components/filter/WeatherFilter";
import CleanoutBagFilter from "@/app/components/filter/CleanoutBagFilter";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import CategoryFilter from "@/app/components/filter/CategoryFilter";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { ArticleFilterContext } from "@/app/context/ArticleFilterContext";
import Image from "next/image";

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
        <div className="flex space-x-1 my-2 px-1">
            <div className="w-[30px] h-[30px] mr-2">
                <Image
                    src="/filter.svg"
                    height={30}
                    width={30}
                    alt="filters"
                    className="w-full"
                />
            </div>

            {filterTypes.includes(FilterType.cleanout) &&
                <CleanoutBagFilter
                    showCleanoutBagItems={showCleanoutBagItems}
                    setShowCleanoutBagItems={setShowCleanoutBagItems}
                />
            }

            {filterTypes.includes(FilterType.weather) &&
                <WeatherFilter
                    selectedWeatherCategories={selectedWeatherCategories!!}
                    setSelectedWeatherCategories={setSelectedWeatherCategories}
                />
            }

            {filterTypes.includes(FilterType.category) &&
                <CategoryFilter
                    selectedArticleCategories={selectedArticleCategories!!}
                    setSelectedArticleCategories={setSelectedArticleCategories}
                />
            }
        </div>
    )
}

export default ArticleFilters;