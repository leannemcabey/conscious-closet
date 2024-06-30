'use client'
import Image from "next/image";
import { deleteArticle } from "@/app/server-actions/deleteArticle";
import { Article } from "@/types/Article";

interface DeleteArticleProps {
    article: Article;
}

const DeleteArticle = ({ article }: DeleteArticleProps) => {
    return (
        <div className="h-12 w-12 w-max bg-theme-light-green rounded-full p-2 drop-shadow-md">
            <Image
                src={"/trash-icon.svg"}
                alt={"trash icon"}
                width="30" height="30"
                onClick={() => deleteArticle(article)}
            />
        </div>
    )
}

export default DeleteArticle;