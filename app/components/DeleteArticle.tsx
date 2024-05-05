'use client'
import Image from "next/image";
import { deleteArticle } from "@/app/server-actions/deleteArticle";
import { Article } from "@/types/Article";

interface DeleteArticleProps {
    article: Article;
}

const DeleteArticle = ({ article }: DeleteArticleProps) => {
    return (
        <Image
            src={"/trash-icon.svg"}
            alt={"trash icon"}
            width="25" height="25"
            onClick={() => deleteArticle(article)}
        />
    )
}

export default DeleteArticle;