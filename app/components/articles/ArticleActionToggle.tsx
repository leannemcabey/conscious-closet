'use client'
import Image from "next/image";

interface ArticleActionToggleProps {
    iconFile: string;
    iconAlt: string;
    isActive: boolean
    clickHandler: () => void;
}

const ArticleActionToggle = ({ iconFile, iconAlt, isActive, clickHandler }: ArticleActionToggleProps) => {
    const backgroundColor = isActive ? "bg-theme-green" : "bg-neutral-300";
    const borderColor = isActive ? "border-theme-green" : "border-neutral-300";
    const positioning = isActive ? "justify-end" : "";

    return (
        <div className={`flex w-[65px] rounded-full mx-1 ${backgroundColor} border border-2 ${borderColor} ${positioning}`}>
            <button
                onClick={() => clickHandler()}
                className={`flex justify-center p-2 rounded-full w-[35px] h-[35px] bg-white`}
            >
                <Image
                    src={iconFile}
                    height={35}
                    width={35}
                    alt={iconAlt}
                    className="w-full"
                />
            </button>
        </div>
    )
}

export default ArticleActionToggle;