'use client'
import Image from "next/image";

interface ArticleActionButtonProps {
    iconFile: string;
    iconAlt: string;
    clickHandler: () => void;
}

const ArticleActionButton = ({ iconFile, iconAlt, clickHandler }: ArticleActionButtonProps) => {
    return (
        <button className="bg-white border border-theme-mid-green rounded-full p-2 drop-shadow">
            <Image
                src={iconFile}
                alt={iconAlt}
                width="30" height="30"
                onClick={() => clickHandler()}
            />
        </button>
    )
}

export default ArticleActionButton;