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
    // const buttonStyling = inCleanoutBag ? "border-theme-mid-green" : "border-neutral-700"

    return (
        <div className={`flex ${position} ${toggleStyling} rounded-full w-20 h-max drop-shadow`}>
            <div className={`h-12 w-12 bg-white border border-theme-green rounded-full p-2 drop-shadow`}>
                <Image
                    src={iconFile}
                    alt={iconAlt}
                    width="30" height="30"
                    onClick={() => clickHandler()}
                />
            </div>
        </div>
    )
}

export default ArticleActionToggle;