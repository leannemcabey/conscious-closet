'use client'
import { deleteArticle } from "@/app/server-actions/article/deleteArticle";
import { Article } from "@/types/article";
import DeleteArticleModal from "@/app/components/articles/DeleteArticleModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorModal from "@/app/components/modal/ErrorModal";
import IconButton from "@/app/components/buttons/IconButton";

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

            {isDeleting && <DeleteArticleModal setIsOpen={setIsDeleting} handleSubmit={handleDelete}/>}

            {deleteError && <ErrorModal setIsOpen={setDeleteError} errorMessage={errorMessage} />}
        </>
    )
}

export default DeleteArticle;