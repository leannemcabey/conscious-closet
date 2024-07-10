'use client'
import { Article } from "@/types/Article";
import {useEffect, useState} from "react";
import NewArticleButton from "@/app/components/articles/new/NewArticleButton";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import ArticleFilters, {FilterTypes} from "@/app/components/articles/filter/ArticleFilters";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import * as React from "react";

interface CategoryPageContainerProps {
    articles: Article[];
    category: ArticleCategory;
}

const CategoryPageContainer = ({ articles, category }: CategoryPageContainerProps) => {
    const [unfilteredArticles, setUnfilteredArticles] = useState<Article[]>(articles)
    const articlesNotInCleanoutBag = unfilteredArticles.filter((article) => !article.inCleanoutBag)
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);
    const [addingArticle, setAddingArticle] = useState<boolean>();

    // when i add the article, i'm updating unfilteredArticles
    // then the useEffect below runs and updates the filteredArticles based on the unfilteredArticles
    // so it effectively clears out the filtering

    console.log(`filtered inside categorypagecontainer: ${filteredArticles?.length}`)

    useEffect(() => {
        const articlesNotInCleanoutBag = unfilteredArticles.filter((article) => !article.inCleanoutBag)
        setFilteredArticles(articlesNotInCleanoutBag)
    }, [unfilteredArticles]);


    return (
        <>
            <div className="flex flex-col">
                <ArticleFilters articles={unfilteredArticles} setFilteredArticles={setFilteredArticles} appliedFilters={[FilterTypes.cleanout, FilterTypes.weather]}/>
                <NewArticleButton setIsAddingArticle={setAddingArticle}/>

                {!filteredArticles || filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles that match the applied filters.
                    </p>
                }

                {filteredArticles && filteredArticles?.length > 0 && <ArticlesContainer articles={filteredArticles}/>}

                {addingArticle && <NewArticleModal setIsOpen={setAddingArticle} category={category} setUnfilteredArticles={setUnfilteredArticles} />}
            </div>
        </>
    )
}

export default CategoryPageContainer;