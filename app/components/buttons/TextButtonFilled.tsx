'use client'

interface TextButtonFilledProps {
    handleClick: () => void;
    disabled: boolean;
    children: string;
}

const TextButtonFilled = ({ handleClick, disabled, children }: TextButtonFilledProps) => {
    return (
        <button onClick={() => handleClick()}
                disabled={disabled}
                className={`${disabled ? "bg-theme-gray text-neutral-300" : "bg-theme-green text-white"} rounded-lg drop-shadow w-max py-2 px-4 md:text-2xl`}
        >
            {children}
        </button>
    )
}

export default TextButtonFilled;