'use client'
import Image from "next/image";
import { deleteArticle } from "@/app/server-actions/article/deleteArticle";
import { Article } from "@/types/article";
import DeleteArticleModal from "@/app/components/articles/DeleteArticleModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ArticleActionButton from "@/app/components/articles/ArticleActionButton";

interface DeleteArticleProps {
    article: Article;
}

const DeleteArticle = ({ article }: DeleteArticleProps) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<boolean>();

    const handleDelete = () => {
        deleteArticle(article)
            .then(() => router.back())
    }

    return (
        <>
            <ArticleActionButton
                iconFile="/trash-icon-green.svg"
                iconAlt="trash icon"
                clickHandler={() => setIsDeleting(true)}
            />

            {isDeleting && <DeleteArticleModal setIsOpen={setIsDeleting} handleSubmit={handleDelete}/>}
        </>
    )
}

export default DeleteArticle;