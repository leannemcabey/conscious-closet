'use client'

import { Article } from "@/types/Article";
import { useState } from "react";
import NewArticleButton from "@/app/components/articles/new/NewArticleButton";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import {ArticleCategory} from "@/types/enums/ArticleCategory";

interface ArticlesListProps {
    articles: Article[];
    category: ArticleCategory;
}

const ArticlesList = ({ articles, category }: ArticlesListProps) => {
    const [addingArticle, setAddingArticle] = useState<boolean>();

    return (
        <>
            <div className="flex flex-col">
                <NewArticleButton setIsAddingArticle={setAddingArticle}/>
                <ArticlesContainer articles={articles}/>

                {addingArticle && <NewArticleModal setIsOpen={setAddingArticle} category={category}/>}
            </div>
        </>
    )
}

export default ArticlesList;