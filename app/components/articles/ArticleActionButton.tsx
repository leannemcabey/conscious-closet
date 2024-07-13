'use client'
import Image from "next/image";

interface ArticleActionButtonProps {
    iconFile: string;
    iconAlt: string;
    clickHandler: () => void;
}

const ArticleActionButton = ({ iconFile, iconAlt, clickHandler }: ArticleActionButtonProps) => {
    return (
        <div className="h-12 w-12 w-max bg-white border border-theme-green rounded-full p-2 drop-shadow">
            <Image
                src={iconFile}
                alt={iconAlt}
                width="30" height="30"
                onClick={() => clickHandler()}
            />
        </div>
    )
}

export default ArticleActionButton;