'use client'
import IconButton from "@/app/components/buttons/IconButton";

interface ArticleActionToggleProps {
    iconFile: string;
    iconAlt: string;
    isActive: boolean
    clickHandler: () => void;
}

const ArticleActionToggle = ({ iconFile, iconAlt, isActive, clickHandler }: ArticleActionToggleProps) => {
    if (isActive) {
        return (
            <div className={`justify-end bg-theme-green flex max-w-[70px] rounded-lg mx-1 drop-shadow`}>
                {/*<div className="w-[60%]">*/}
                    <IconButton handleClick={() => clickHandler()} isActive={true} iconPath={iconFile} iconAlt={iconAlt} />
                {/*</div>*/}
            </div>
        )
    }

    if (!isActive) {
        return (
            <div className={`bg-white flex max-w-[70px] rounded-lg mx-1 drop-shadow`}>
                {/*<div className="w-[60%]">*/}
                    <IconButton handleClick={() => clickHandler()} isActive={true} iconPath={iconFile} iconAlt={iconAlt} />
                {/*</div>*/}
            </div>
        )
    }
}

export default ArticleActionToggle;