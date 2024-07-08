'use client'

import { Article } from "@/types/Article";
import { useState } from "react";
import NewArticleButton from "@/app/components/articles/new/NewArticleButton";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import {ArticleCategory} from "@/types/enums/ArticleCategory";
import ArticleFilters from "@/app/components/ArticleFilters";

interface ArticlesListProps {
    articles: Article[];
    category: ArticleCategory;
}

const ArticlesList = ({ articles, category }: ArticlesListProps) => {
    const articlesNotInCleanoutBag = articles.filter((article) => !article.inCleanoutBag)
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(articlesNotInCleanoutBag);
    const [addingArticle, setAddingArticle] = useState<boolean>();

    return (
        <>
            <div className="flex flex-col">
                <ArticleFilters articles={articles} filteredArticles={filteredArticles} setFilteredArticles={setFilteredArticles}/>
                <NewArticleButton setIsAddingArticle={setAddingArticle}/>
                <ArticlesContainer articles={filteredArticles}/>

                {addingArticle && <NewArticleModal setIsOpen={setAddingArticle} category={category}/>}
            </div>
        </>
    )
}

export default ArticlesList;