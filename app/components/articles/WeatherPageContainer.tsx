'use client'
import { Article } from "@/types/Article";
import { useState } from "react";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import ArticleFilters, {FilterTypes} from "@/app/components/articles/filter/ArticleFilters";
import * as React from "react";

interface WeatherPageContainerProps {
    articles: Article[];
}

const WeatherPageContainer = ({ articles }: WeatherPageContainerProps) => {
    const articlesNotInCleanoutBag = articles.filter((article) => !article.inCleanoutBag)
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);

    return (
        <>
            <div className="flex flex-col">
                <ArticleFilters articles={articles} setFilteredArticles={setFilteredArticles} filterTypes={[FilterTypes.cleanout, FilterTypes.category]}/>

                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles}/>}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>
                }
            </div>
        </>
    )
}

export default WeatherPageContainer;