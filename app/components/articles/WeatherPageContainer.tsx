'use client'
import {Article} from "@/types/article";
import * as React from "react";
import {useEffect, useState} from "react";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import ArticleFilters, {FilterType} from "@/app/components/filter/ArticleFilters";
import {ArticleFilterContext, FilterSettings} from "@/app/context/ArticleFilterContext";
import {ArticleCategoryEnum} from "@/types/enums/articleCategoryEnum";
import {applyArticleFilters} from "@/utils/applyArticleFilters";

interface WeatherPageContainerProps {
    articles: Article[];
}

const WeatherPageContainer = ({ articles }: WeatherPageContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedArticleCategories: Object.keys(ArticleCategoryEnum).map((category) => ArticleCategoryEnum[category])
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const articlesNotInCleanoutBag = articles.filter((article) => !article.inCleanoutBag)
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);

    const filterTypes = [FilterType.cleanout, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col h-[95%]">
                <ArticleFilters filterTypes={filterTypes}/>

                {filteredArticles.length > 0 && (
                    <div className="h-[90%] md:h-[95%] pb-4">
                        <ArticlesContainer articles={filteredArticles}/>
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

export default WeatherPageContainer;