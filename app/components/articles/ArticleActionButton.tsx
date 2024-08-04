'use client'
import Image from "next/image";
import IconButton from "@/app/components/buttons/IconButton";

interface ArticleActionButtonProps {
    iconFile: string;
    iconAlt: string;
    clickHandler: () => void;
}

const ArticleActionButton = ({ iconFile, iconAlt, clickHandler }: ArticleActionButtonProps) => {
    return (
        <IconButton handleClick={() => clickHandler()} isActive={true} iconPath={iconFile} iconAlt={iconAlt} />
    )
}

export default ArticleActionButton;