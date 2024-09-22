'use client'
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import ArticleFilters, {FilterType} from "@/app/components/filter/ArticleFilters";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import * as React from "react";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import NewButton from "@/app/components/buttons/NewButton";
import NoArticlesMessage from "@/app/components/articles/NoArticlesMessage";

interface CategoryPageContainerProps {
    articles: Article[];
    category: ArticleCategoryEnum;
}

const CategoryPageContainer = ({ articles, category }: CategoryPageContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticles, setUnfilteredArticles] = useState<Article[]>(articles)
    const articlesNotInCleanoutBag = unfilteredArticles.filter((article) => !article.inCleanoutBag);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);
    const [addingArticle, setAddingArticle] = useState<boolean>(false);

    const filterTypes= [FilterType.cleanout, FilterType.weather];

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
                        category={category}
                        unfilteredArticles={unfilteredArticles}
                        setUnfilteredArticles={setUnfilteredArticles}
                    />}

                <div className="fixed top-12 right-[9px]">
                    <NewButton
                        handleClick={() => setAddingArticle(true)}
                    />
                </div>
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CategoryPageContainer;