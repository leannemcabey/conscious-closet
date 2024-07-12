'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import { Article } from "@/types/Article";
import * as React from "react";
import {useEffect, useState} from "react";
import ArticleFilters, {FilterType} from "@/app/components/articles/filter/ArticleFilters";
import {ArticleFilterContext, FilterSettings} from "@/app/context/ArticleFilterContext";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import {applyArticleFilters} from "@/utils/applyArticleFilters";

interface SuitcaseContainerProps {
    articles: Article[]
}

const SuitcaseContainer = ({ articles }: SuitcaseContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: true,
        selectedWeatherCategories: [WeatherCategory.COLD, WeatherCategory.MIXED, WeatherCategory.WARM],
        selectedArticleCategories: [
            ArticleCategory.TOPS,
            ArticleCategory.BOTTOMS,
            ArticleCategory.JUMPSUITS_ROMPERS,
            ArticleCategory.ACTIVEWEAR,
            ArticleCategory.SHOES,
            ArticleCategory.OUTERWEAR,
            ArticleCategory.ACCESSORIES
        ]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

    const filterTypes = [FilterType.weather, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col">
                <ArticleFilters filterTypes={filterTypes} />

                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles} />}
                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>}
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default SuitcaseContainer;