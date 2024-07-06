'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { Article } from "@/types/Article";
import { deleteAllFromCleanoutBag } from "@/app/server-actions/deleteAllFromCleanoutBag";
import { useState } from "react";
import DeleteConfirmationModal from "@/app/components/cleanoutBag/DeleteConfirmationModal";

interface CleanoutBagContainerProps {
    articles: Article[]
}

const CleanoutBagContainer = ({ articles }: CleanoutBagContainerProps) => {
    const [cleanoutBagArticles, setCleanoutBagArticles] = useState<Article[]>(articles);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const deleteAllAndResetData = () => {
        deleteAllFromCleanoutBag()
            .then(() => {
                setCleanoutBagArticles([])
                setIsDeleting(false)
            })
    }

    const deleteDisabled: boolean = cleanoutBagArticles.length <= 0;

    return (
        <div className="flex flex-col">
            <button
                disabled={deleteDisabled}
                onClick={() => setIsDeleting(true)}
                className="rounded-lg bg-theme-gray text-neutral-500 drop-shadow-md self-center p-2 mb-8"
            >
                Delete All
            </button>

            {isDeleting && <DeleteConfirmationModal setIsDeleting={setIsDeleting} handleSubmit={deleteAllAndResetData}/>}

            <ArticlesContainer articles={cleanoutBagArticles} />
        </div>
    )
}

export default CleanoutBagContainer;