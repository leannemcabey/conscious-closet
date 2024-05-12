'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { Article } from "@/types/Article";
import { deleteAllFromCleanoutBag } from "@/app/server-actions/deleteAllFromCleanoutBag";
import { useState } from "react";

interface CleanoutBagContainerProps {
    articles: Article[]
}

const CleanoutBagContainer = ({ articles }: CleanoutBagContainerProps) => {
    console.log("checking for re-render")
    const [cleanoutBagArticles, setCleanoutBagArticles] = useState<Article[]>(articles);

    const deleteAllAndResetData = () => {
        deleteAllFromCleanoutBag()
            .then(() => setCleanoutBagArticles([]))
    }

    return (
        <>
            {/*Absolutely need a message saying this deletes the articles, not just removes them from cleanout*/}
            <button onClick={() => deleteAllAndResetData()}>Delete All</button>
            <ArticlesContainer articles={cleanoutBagArticles} />
        </>
    )
}

export default CleanoutBagContainer;