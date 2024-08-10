'use client'

interface TextButtonProps {
    widthStyling?: string;
    disabled: boolean
    handleClick: () => void;
    colorOverride?: string;
    removeDropShadow?: boolean;
    children: string;
}

const TextButton = ({ widthStyling, disabled, handleClick, colorOverride, removeDropShadow, children }: TextButtonProps) => {
    const colorStyling = colorOverride ? colorOverride : "border-theme-green text-theme-green";

    return (
        <button
            className={`${disabled && "invisible"} border bg-white ${colorStyling} rounded-lg p-1 ${widthStyling} ${!removeDropShadow && "drop-shadow"} md:text-lg`}
            onClick={() => handleClick()}
        >
            <div className="flex justify-center">
                {children}
            </div>
        </button>
    )
}

export default TextButton