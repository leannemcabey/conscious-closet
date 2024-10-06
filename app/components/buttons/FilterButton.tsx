'use client'
import Image from "next/image";

interface FilterButtonProps {
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

const FilterButton = ({handleClick, isActive, iconPath, iconAlt, sizeOverride, colorOverride, borderOverride, iconRotation, disabled}: FilterButtonProps) => {
    const colorStyling = isActive ? "bg-white" : "bg-neutral-300";
    const borderStyling = isActive ? "border border-theme-green" : "";

    return (
        <button
            onClick={() => handleClick()}
            disabled={disabled}
            className={`flex flex-col justify-center px-3 py-1 items-center rounded-full ${borderStyling} ${colorStyling}`}
        >
            <div className="w-[20px] h-[20px]">
                <Image
                    src={iconPath}
                    height={20}
                    width={20}
                    alt={iconAlt}
                    className={`w-full ${iconRotation}`}
                />
            </div>
        </button>
    )
}

export default FilterButton;