'use client'
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import ArticleFilters, {FilterType} from "@/app/components/articles/filter/ArticleFilters";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import * as React from "react";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import NewButton from "@/app/components/NewButton";

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
            <div className="flex flex-col h-[90%] md:h-[95%]">
                <ArticleFilters filterTypes={filterTypes}/>

                {filteredArticles.length > 0 && (
                    <div className="h-[87%] md:h-[84%] pb-4">
                        <ArticlesContainer articles={filteredArticles}/>
                    </div>
                )}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>
                }

                {addingArticle &&
                    <NewArticleModal
                        setIsOpen={setAddingArticle}
                        category={category}
                        unfilteredArticles={unfilteredArticles}
                        setUnfilteredArticles={setUnfilteredArticles}
                    />}

                <NewButton handleClick={() => setAddingArticle(true)} />
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CategoryPageContainer;