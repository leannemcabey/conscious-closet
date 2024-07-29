'use client'
import Image from "next/image";

interface ArticleActionToggleProps {
    iconFile: string;
    iconAlt: string;
    isActive: boolean
    clickHandler: () => void;
}

const ArticleActionToggle = ({ iconFile, iconAlt, isActive, clickHandler }: ArticleActionToggleProps) => {
    const position = isActive ? "justify-end" : "";
    const toggleStyling = isActive ? "bg-theme-light-green" : "bg-white";

    return (
        <div className={`flex max-w-[80px] ${position} ${toggleStyling} rounded-full mx-1 drop-shadow`}>
            <button className={`w-[60%] bg-neutral-700 rounded-full p-2 drop-shadow`}>
                <Image
                    src={iconFile}
                    alt={iconAlt}
                    width="30" height="30"
                    onClick={() => clickHandler()}
                />
            </button>
        </div>
    )
}

export default ArticleActionToggle;