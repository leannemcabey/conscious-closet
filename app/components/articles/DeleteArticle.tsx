'use client'
import Image from "next/image";
import { deleteArticle } from "@/app/server-actions/article/deleteArticle";
import { Article } from "@/types/article";
import DeleteArticleModal from "@/app/components/articles/DeleteArticleModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
            <div className="h-12 w-12 w-max bg-white border border-theme-green rounded-full p-2 drop-shadow">
                <Image
                    src={"/trash-icon-green.svg"}
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