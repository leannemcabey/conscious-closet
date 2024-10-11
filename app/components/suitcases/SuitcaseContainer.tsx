'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import { Article } from "@/types/article";
import * as React from "react";
import {useEffect, useState} from "react";
import ArticleFilters, {FilterType} from "@/app/components/filter/ArticleFilters";
import {ArticleFilterContext, FilterSettings} from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import { articleCategories } from "@/constants/articleCategories";
import NoArticlesMessage from "@/app/components/articles/NoArticlesMessage";

interface SuitcaseContainerProps {
    articles: Article[]
}

const SuitcaseContainer = ({ articles }: SuitcaseContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: true,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM],
        selectedArticleCategories: articleCategories.map((category) => ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])
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
            <div className="h-[88%] flex flex-col md:h-[90%]">
                <ArticleFilters filterTypes={filterTypes} />

                {filteredArticles.length === 0 && <NoArticlesMessage />}
                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles}/>}
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default SuitcaseContainer;