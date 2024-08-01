'use client'
import Image from "next/image";

interface ArticleActionButtonProps {
    iconFile: string;
    iconAlt: string;
    clickHandler: () => void;
}

const ArticleActionButton = ({ iconFile, iconAlt, clickHandler }: ArticleActionButtonProps) => {
    return (
        <button className="flex flex-col justify-center bg-theme-green rounded-full p-2 drop-shadow w-[48px] h-[48px] md:w-[60px] md:h-[60px]">
            <Image
                src={iconFile}
                alt={iconAlt}
                width="40"
                height="40"
                onClick={() => clickHandler()}
                className="w-[90%] self-center"
            />
        </button>
    )
}

export default ArticleActionButton;