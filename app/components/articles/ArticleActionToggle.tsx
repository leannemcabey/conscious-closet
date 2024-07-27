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
    const toggleStyling = isActive ? "bg-theme-mid-green" : "bg-white";

    return (
        <div className={`flex ${position} ${toggleStyling} rounded-full w-20 max-w-1/3 mx-1 drop-shadow`}>
            <button className={`bg-white border border-theme-mid-green rounded-full p-2 drop-shadow`}>
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