'use client'
import { Article } from "@/types/article";
import * as React from "react";
import { useEffect, useState } from "react";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import ArticleFilters, {FilterType} from "@/app/components/filter/ArticleFilters";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import { articleCategories } from "@/constants/articleCategories";
import NoArticlesMessage from "@/app/components/articles/NoArticlesMessage";

interface WeatherPageContainerProps {
    articles: Article[];
}

const WeatherPageContainer = ({ articles }: WeatherPageContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedArticleCategories: articleCategories.map((category) => ArticleCategoryEnum[category  as keyof typeof ArticleCategoryEnum])
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
            <div className="h-[97%] flex flex-col">
                <ArticleFilters filterTypes={filterTypes}/>

                {filteredArticles.length === 0 && <NoArticlesMessage />}
                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles}/>}
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default WeatherPageContainer;