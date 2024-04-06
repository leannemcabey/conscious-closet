'use client'
import Image from "next/image";
import { NewArticleInput } from "@/types/NewArticleInput";
import { createArticle } from "@/app/server-actions/createArticle";

interface CreateArticleButtonProps {
    newArticleInput: NewArticleInput;
}

export const CreateArticleButton = ({ newArticleInput }: CreateArticleButtonProps) => {
    // TODO disable this until an image and weather category are selected
    return (
        <button onClick={() => createArticle(newArticleInput)} className="mt-8 self-end">
            <Image src="/check-mark-button.svg" height="40" width="40" alt="check mark icon"/>
        </button>
    )
}