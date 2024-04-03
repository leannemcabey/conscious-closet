'use client'
import Image from "next/image";

export const CreateArticleButton = () => {
    // TODO disable this until an image and weather category are selected
    return (
        <button onClick={() => console.log("creating a new article")} className="mt-8 self-end">
            <Image src="/check-mark-button.svg" height="40" width="40" alt="check mark icon"/>
        </button>
    )
}