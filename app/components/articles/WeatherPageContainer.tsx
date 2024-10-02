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
import NewButton from "@/app/components/buttons/NewButton";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";

interface WeatherPageContainerProps {
    articles: Article[];
    weatherCategory: WeatherCategoryEnum;
}

const WeatherPageContainer = ({ articles, weatherCategory }: WeatherPageContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedArticleCategories: articleCategories.map((category) => ArticleCategoryEnum[category  as keyof typeof ArticleCategoryEnum])
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticles, setUnfilteredArticles] = useState<Article[]>(articles)
    const articlesNotInCleanoutBag = unfilteredArticles.filter((article) => !article.inCleanoutBag)
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);
    const [addingArticle, setAddingArticle] = useState<boolean>(false);

    const filterTypes = [FilterType.cleanout, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(unfilteredArticles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [unfilteredArticles, filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="h-[97%] flex flex-col">
                <ArticleFilters filterTypes={filterTypes}/>

                {filteredArticles.length === 0 && <NoArticlesMessage />}
                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles}/>}

                {addingArticle &&
                    <NewArticleModal
                        setIsOpen={setAddingArticle}
                        weatherCategory={weatherCategory}
                        unfilteredArticles={unfilteredArticles}
                        setUnfilteredArticles={setUnfilteredArticles}
                    />
                }

                <div className="fixed top-12 right-[9px]">
                    <NewButton
                        handleClick={() => setAddingArticle(true)}
                    />
                </div>
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default WeatherPageContainer;