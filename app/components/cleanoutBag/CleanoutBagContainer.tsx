'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { Article } from "@/types/Article";
import { deleteAllFromCleanoutBag } from "@/app/server-actions/cleanout-bag/deleteAllFromCleanoutBag";
import { useState } from "react";
import DeleteAllFromCleanoutConfirmationModal from "@/app/components/cleanoutBag/DeleteAllFromCleanoutConfirmationModal";

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
                className="rounded-lg bg-white text-neutral-700 drop-shadow self-center p-2 mb-8"
            >
                Delete All
            </button>

            {isDeleting && <DeleteAllFromCleanoutConfirmationModal setIsDeleting={setIsDeleting} handleSubmit={deleteAllAndResetData}/>}

            {cleanoutBagArticles.length > 0 && <ArticlesContainer articles={cleanoutBagArticles} />}

            {cleanoutBagArticles.length === 0 &&
                <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                    There are no articles in your cleanout bag.
                </p>
            }
        </div>
    )
}

export default CleanoutBagContainer;