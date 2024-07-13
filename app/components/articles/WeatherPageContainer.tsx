'use client'
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import ArticleFilters, {FilterType} from "@/app/components/articles/filter/ArticleFilters";
import * as React from "react";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";

interface WeatherPageContainerProps {
    articles: Article[];
}

const WeatherPageContainer = ({ articles }: WeatherPageContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedArticleCategories: [
            ArticleCategoryEnum.TOPS,
            ArticleCategoryEnum.BOTTOMS,
            ArticleCategoryEnum.JUMPSUITS_ROMPERS,
            ArticleCategoryEnum.ACTIVEWEAR,
            ArticleCategoryEnum.SHOES,
            ArticleCategoryEnum.OUTERWEAR,
            ArticleCategoryEnum.ACCESSORIES
        ]
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
            <div className="flex flex-col">
                <ArticleFilters filterTypes={filterTypes}/>

                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles}/>}

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