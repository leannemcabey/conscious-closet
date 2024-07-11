'use client'
import { Article } from "@/types/Article";
import {useEffect, useState} from "react";
import NewArticleButton from "@/app/components/articles/new/NewArticleButton";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import ArticleFilters, {FilterTypes} from "@/app/components/articles/filter/ArticleFilters";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import * as React from "react";
import {WeatherCategory} from "@/types/enums/WeatherCategory";
import {ArticleFilterContext, FilterSettings} from "@/app/context/ArticleFilterContext";

interface CategoryPageContainerProps {
    articles: Article[];
    category: ArticleCategory;
}

const CategoryPageContainer = ({ articles, category }: CategoryPageContainerProps) => {
    const [unfilteredArticles, setUnfilteredArticles] = useState<Article[]>(articles)
    const articlesNotInCleanoutBag = unfilteredArticles.filter((article) => !article.inCleanoutBag)
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);
    const [addingArticle, setAddingArticle] = useState<boolean>();

    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategory.COLD, WeatherCategory.MIXED, WeatherCategory.WARM]
    }
    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext)

    // when i add the article, i'm updating unfilteredArticles
    // then the useEffect below runs and updates the filteredArticles based on the unfilteredArticles
    // so it effectively clears out the filtering, but the visual depiction of the applied filters doesn't change

    console.log(`filtered inside categorypagecontainer: ${filteredArticles?.length}`)

    useEffect(() => {
        // before we do the below, we maintain reference to the filtered items
        console.log(`filtered inside useeffect: ${filteredArticles.length}`)

        const articlesNotInCleanoutBag = unfilteredArticles.filter((article) => !article.inCleanoutBag)
        setFilteredArticles(articlesNotInCleanoutBag)
    }, [unfilteredArticles]);


    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col">
                <ArticleFilters articles={unfilteredArticles} setFilteredArticles={setFilteredArticles} filterTypes={[FilterTypes.cleanout, FilterTypes.weather]}/>
                <NewArticleButton setIsAddingArticle={setAddingArticle}/>

                {!filteredArticles || filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>
                }

                {filteredArticles && filteredArticles?.length > 0 && <ArticlesContainer articles={filteredArticles}/>}

                {addingArticle && <NewArticleModal setIsOpen={setAddingArticle} category={category} setUnfilteredArticles={setUnfilteredArticles} />}
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CategoryPageContainer;