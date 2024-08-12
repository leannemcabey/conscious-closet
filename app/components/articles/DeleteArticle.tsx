'use client'
import Image from "next/image";
import { deleteArticle } from "@/app/server-actions/article/deleteArticle";
import { Article } from "@/types/article";
import DeleteArticleModal from "@/app/components/articles/DeleteArticleModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ArticleActionButton from "@/app/components/articles/ArticleActionButton";
import ErrorModal from "@/app/components/modal/ErrorModal";
import IconButton from "@/app/components/buttons/IconButton";
import Link from "next/link";
import ConfirmationModal from "@/app/components/modal/ConfirmationModal";
import * as React from "react";

interface DeleteArticleProps {
    article: Article;
}

const DeleteArticle = ({ article }: DeleteArticleProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<boolean>(false);

    const errorMessage = "An error occurred while trying to delete this article. Please try again."

    const handleDelete = () => {
        deleteArticle(article)
            .then(() => router.back())
            .catch(() => setDeleteError(true))
    }

    return (
        <>
            <IconButton handleClick={() => setIsDeleting(true)} isActive={true} iconPath="/trash-icon.svg" iconAlt="trash icon" />

            {isDeleting &&
                <ConfirmationModal setIsOpen={setIsDeleting} confirmAction={handleDelete}>
                    <>
                        <p className="self-center w-[80%] text-center text-base p-2 bg-neutral-200 rounded-lg md:text-xl">
                            Reminder that clothes aren't trash! Check out our <Link href="/cleanout/recommendations" className="text-theme-green"> cleanout recs </Link>
                            page for some suggestions on sustainable ways to clean out your closet.
                        </p>
                        <p className="text-center text-xl my-8 md:text-2xl">
                            Are you sure you want to delete this article from your closet?
                        </p>
                    </>
                </ConfirmationModal>
            }

            {deleteError && <ErrorModal setIsOpen={setDeleteError} errorMessage={errorMessage} />}
        </>
    )
}

export default DeleteArticle;