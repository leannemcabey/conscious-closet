'use client'
import Image from "next/image";

interface FilterButtonProps {
    handleClick: () => void;
    isActive: boolean;
    iconPath: string;
    iconAlt: string;
}

const FilterButton = ({handleClick, isActive, iconPath, iconAlt}: FilterButtonProps) => {
    const colorStyling = isActive ? "bg-white" : "bg-neutral-300";
    const borderStyling = isActive ? "border border-theme-green" : "border border-neutral-300";

    return (
        <button
            onClick={() => handleClick()}
            className={`flex flex-col justify-center px-3 py-1 items-center rounded-full ${borderStyling} ${colorStyling}`}
        >
            <div className="w-[20px] h-[20px]">
                <Image
                    src={iconPath}
                    height={20}
                    width={20}
                    alt={iconAlt}
                    className="w-full"
                />
            </div>
        </button>
    )
}

export default FilterButton;