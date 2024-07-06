'use client'

import {Dispatch, SetStateAction} from "react";

interface NewArticleButtonProps {
    setIsAddingArticle: Dispatch<SetStateAction<boolean>>
}

const NewArticleButton = ({ setIsAddingArticle }: NewArticleButtonProps) => {
    return (
        <button
            className="rounded-md bg-white border border-theme-light-green w-full py-1 mb-4 drop-shadow-sm text-lg text-theme-green"
            onClick={() => setIsAddingArticle(true)}
        >
            +
        </button>
    )
}

export default NewArticleButton;