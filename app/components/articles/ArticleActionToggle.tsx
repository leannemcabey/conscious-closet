'use client'
import IconButton from "@/app/components/buttons/IconButton";

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
        <div className={`flex max-w-[70px] ${position} ${toggleStyling} rounded-lg mx-1 drop-shadow md:max-w-[100px]`}>
            <div className="w-[60%]">
                <IconButton handleClick={() => clickHandler()} isActive={true} iconPath={iconFile} iconAlt={iconAlt} />
            </div>
        </div>
    )
}

export default ArticleActionToggle;