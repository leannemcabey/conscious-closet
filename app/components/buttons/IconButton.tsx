'use client'
import Image from "next/image";

interface IconButtonProps {
    handleClick: () => void;
    isActive: boolean;
    iconPath: string;
    iconAlt: string;
    sizeOverride?: string;
    disabled?: boolean;
}

const IconButton = ({handleClick, isActive, iconPath, iconAlt, sizeOverride, disabled}: IconButtonProps) => {
    const sizeStyling = sizeOverride ? sizeOverride : "w-[40px] h-[40px]";
    const colorStyling = `${isActive ? "bg-button-green" : "bg-transparent"}`;
    const borderStyling = `${isActive ? "" : "border border-neutral-300"}`

    return (
        <button
            onClick={() => handleClick()}
            disabled={disabled}
            className={`flex justify-center p-2 rounded-lg ${borderStyling} ${colorStyling} ${sizeStyling}`}
        >
            <Image
                src={iconPath}
                height={40}
                width={40}
                alt={iconAlt}
                className="w-full"
            />
        </button>
    )
}

export default IconButton;