'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import ArticleFilters, {FilterType} from "@/app/components/filter/ArticleFilters";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import { articleCategories } from "@/constants/articleCategories";

interface CleanoutBagContainerProps {
    articles: Article[]
}

const CleanoutBagContainer = ({ articles }: CleanoutBagContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: true,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM],
        selectedArticleCategories: articleCategories.map((category) => ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [cleanoutBagArticles, setCleanoutBagArticles] = useState<Article[]>(articles);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(cleanoutBagArticles);

    const filterTypes = [FilterType.weather, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    const deleteDisabled: boolean = cleanoutBagArticles.length <= 0;

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col h-[97%] md:mt-8">
                <ArticleFilters filterTypes={filterTypes} />

                {filteredArticles.length > 0 && (
                    <div className="h-[84%] md:h-[80%] lg:h-[75%] pb-4">
                        <ArticlesContainer articles={filteredArticles} />
                    </div>
                )}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles in your cleanout bag that match the applied filters.
                    </p>
                }
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CleanoutBagContainer;