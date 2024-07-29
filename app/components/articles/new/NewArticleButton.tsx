'use client'
import { Dispatch, SetStateAction } from "react";

interface NewArticleButtonProps {
    setIsAddingArticle: Dispatch<SetStateAction<boolean>>
}

const NewArticleButton = ({ setIsAddingArticle }: NewArticleButtonProps) => {
    return (
        <button
            className="rounded-md bg-neutral-700 w-full py-1 mb-4 drop-shadow text-lg text-white"
            onClick={() => setIsAddingArticle(true)}
        >
            +
        </button>
    )
}

export default NewArticleButton;