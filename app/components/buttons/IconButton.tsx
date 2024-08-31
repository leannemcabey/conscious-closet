'use client'
import Image from "next/image";

interface IconButtonProps {
    handleClick: () => void;
    isActive: boolean;
    iconPath: string;
    iconAlt: string;
    sizeOverride?: string;
    colorOverride?: { active: string, inactive: string };
    borderOverride?: { active: string, inactive: string };
    iconRotation?: string;
    disabled?: boolean
}

const IconButton = ({handleClick, isActive, iconPath, iconAlt, sizeOverride, colorOverride, borderOverride, iconRotation, disabled}: IconButtonProps) => {
    const sizeStyling = sizeOverride ? sizeOverride : "w-[40px] h-[40px]";
    const colorStyling = colorOverride ? `${isActive ? colorOverride.active : colorOverride.inactive}` : `${isActive ? "bg-white" : "bg-background-green"}`;
    const borderStyling = borderOverride ? `${isActive ? borderOverride.active : borderOverride.inactive}` : `border border-theme-green`

    return (
        <button
            onClick={() => handleClick()}
            disabled={disabled}
            className={`flex justify-center p-2 ${borderStyling} rounded-lg ${colorStyling} drop-shadow ${sizeStyling}`}
        >
            <Image
                src={iconPath}
                height={40}
                width={40}
                alt={iconAlt}
                className={`w-full ${iconRotation}`}
            />
        </button>
    )
}

export default IconButton;