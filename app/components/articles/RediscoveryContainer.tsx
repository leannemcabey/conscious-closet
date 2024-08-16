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

interface RediscoveryContainerProps {
    articles: Article[]
}

const RediscoveryContainer = ({ articles }: RediscoveryContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM],
        selectedArticleCategories: articleCategories.map((category) => ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticles, setUnfilteredArticles] = useState<Article[]>(articles);
    const articlesNotInCleanoutBag = unfilteredArticles.filter((article) => !article.inCleanoutBag);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);

    const filterTypes = [FilterType.cleanout, FilterType.weather, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="h-full flex flex-col">
                <ArticleFilters filterTypes={filterTypes} />

                {filteredArticles.length > 0 && (
                    <div className="h-[75%] md:h-[70%] lg:h-[65%] pb-4">
                        <ArticlesContainer articles={filteredArticles} />
                    </div>
                )}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>
                }
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default RediscoveryContainer;