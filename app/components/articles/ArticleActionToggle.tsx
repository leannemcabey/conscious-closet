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
        <div className={`flex max-w-[80px] ${position} ${toggleStyling} rounded-full mx-1 drop-shadow md:max-w-[100px]`}>
            <button className={`flex flex-col justify-center w-[60%] bg-theme-green rounded-full p-2 drop-shadow w-[48px] h-[48px] md:w-[60px] md:h-[60px]`}>
                <Image
                    src={iconFile}
                    alt={iconAlt}
                    width="40"
                    height="40"
                    onClick={() => clickHandler()}
                    className="w-[80%] self-center"
                />
            </button>
        </div>
    )
}

export default ArticleActionToggle;