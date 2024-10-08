'use client'
import { ReactElement } from "react";

interface TextButtonProps {
    widthStyling?: string;
    disabled: boolean
    handleClick: () => void;
    colorOverride?: string;
    children: string | ReactElement;
}

const TextButton = ({ widthStyling, disabled, handleClick, colorOverride, children }: TextButtonProps) => {
    const colorStyling = colorOverride ? colorOverride : "bg-white border-theme-green text-theme-green";
    const inactiveColorStyling = "bg-neutral-200 border-neutral-200 text-neutral-400";

    return (
        <button
            className={`border ${disabled ? inactiveColorStyling : colorStyling} rounded-lg py-1 px-3 ${widthStyling} md:text-lg lg:text-base`}
            onClick={() => handleClick()}
        >
            <div className="flex justify-center">
                {children}
            </div>
        </button>
    )
}

export default TextButton