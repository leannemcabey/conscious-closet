'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import {Article} from "@/types/Article";
import * as React from "react";
import {useState} from "react";
import ArticleFilters, {FilterTypes} from "@/app/components/articles/filter/ArticleFilters";

interface SuitcaseContainerProps {
    articles: Article[]
}

const SuitcaseContainer = ({ articles }: SuitcaseContainerProps) => {
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

    return (
        <div className="flex flex-col">
            <ArticleFilters articles={articles} setFilteredArticles={setFilteredArticles} filterTypes={[FilterTypes.category, FilterTypes.weather]} />

            {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles} />}
            {filteredArticles.length === 0 &&
                <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                    There are no articles that match the applied filters.
                </p>}
        </div>
    )
}

export default SuitcaseContainer;