'use client'
import Image from "next/image";
import { deleteArticle } from "@/app/server-actions/article/deleteArticle";
import { Article } from "@/types/Article";
import DeleteArticleModal from "@/app/components/articles/DeleteArticleModal";
import { useState } from "react";

interface DeleteArticleProps {
    article: Article;
}

const DeleteArticle = ({ article }: DeleteArticleProps) => {
    const [isDeleting, setIsDeleting] = useState<boolean>();

    const handleDelete = () => {
        deleteArticle(article)
            .then(() => setIsDeleting(false))
    }

    return (
        <>
            <div className="h-12 w-12 w-max bg-background-green border border-theme-blue rounded-full p-2 drop-shadow">
                <Image
                    src={"/trash-icon.svg"}
                    alt={"trash icon"}
                    width="30" height="30"
                    onClick={() => setIsDeleting(true)}
                />
            </div>

            {isDeleting && <DeleteArticleModal setIsOpen={setIsDeleting} handleSubmit={handleDelete}/>}
        </>
    )
}

export default DeleteArticle;