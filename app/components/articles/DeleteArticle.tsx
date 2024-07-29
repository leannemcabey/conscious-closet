'use client'
import Image from "next/image";
import { deleteArticle } from "@/app/server-actions/article/deleteArticle";
import { Article } from "@/types/article";
import DeleteArticleModal from "@/app/components/articles/DeleteArticleModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ArticleActionButton from "@/app/components/articles/ArticleActionButton";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface DeleteArticleProps {
    article: Article;
}

const DeleteArticle = ({ article }: DeleteArticleProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<boolean>();
    const [deleteError, setDeleteError] = useState<boolean>();

    const errorMessage = "An error occurred while trying to delete this article. Please try again."

    const handleDelete = () => {
        deleteArticle(article)
            .then(() => router.back())
            .catch(() => setDeleteError(true))
    }

    return (
        <>
            <ArticleActionButton
                iconFile="/trash-icon-white.svg"
                iconAlt="trash icon"
                clickHandler={() => setIsDeleting(true)}
            />

            {isDeleting && <DeleteArticleModal setIsOpen={setIsDeleting} handleSubmit={handleDelete}/>}

            {deleteError && <ErrorModal setIsOpen={setDeleteError} errorMessage={errorMessage} />}
        </>
    )
}

export default DeleteArticle;