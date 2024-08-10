'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import { Article } from "@/types/article";
import * as React from "react";
import {useEffect, useState} from "react";
import ArticleFilters, {FilterType} from "@/app/components/filter/ArticleFilters";
import {ArticleFilterContext, FilterSettings} from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import {applyArticleFilters} from "@/utils/applyArticleFilters";

interface SuitcaseContainerProps {
    articles: Article[]
}

const SuitcaseContainer = ({ articles }: SuitcaseContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: true,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM],
        selectedArticleCategories: Object.keys(ArticleCategoryEnum).map((category) => ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

    const filterTypes = [FilterType.cleanout, FilterType.weather, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col h-[85%] md:h-[90%]">
                <ArticleFilters filterTypes={filterTypes} />

                {filteredArticles.length > 0 && (
                    <div className="h-[90%] md:h-[82%] pb-4">
                        <ArticlesContainer articles={filteredArticles} />
                    </div>
                )}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>}
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default SuitcaseContainer;