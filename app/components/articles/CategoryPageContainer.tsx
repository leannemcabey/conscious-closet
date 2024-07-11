'use client'
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import NewArticleButton from "@/app/components/articles/new/NewArticleButton";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import ArticleFilters, {FilterTypes} from "@/app/components/articles/filter/ArticleFilters";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import * as React from "react";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { applyArticleFilters } from "@/utils/applyArticleFilters";

interface CategoryPageContainerProps {
    articles: Article[];
    category: ArticleCategory;
}

const CategoryPageContainer = ({ articles, category }: CategoryPageContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategory.COLD, WeatherCategory.MIXED, WeatherCategory.WARM]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const articlesNotInCleanoutBag = articles.filter((article) => !article.inCleanoutBag);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);
    const [addingArticle, setAddingArticle] = useState<boolean>();

    const appliedFilters= [FilterTypes.cleanout, FilterTypes.weather];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, appliedFilters, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col">
                <ArticleFilters appliedFilters={appliedFilters}/>
                <NewArticleButton setIsAddingArticle={setAddingArticle}/>

                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles}/>}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>
                }

                {addingArticle && <NewArticleModal setIsOpen={setAddingArticle} category={category}/>}
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CategoryPageContainer;