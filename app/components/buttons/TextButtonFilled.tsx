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
                className={`${disabled ? "bg-theme-gray text-neutral-300" : "bg-gradient-to-r from-button-gradient-start to-button-gradient-end text-white"} rounded-lg w-max py-2 px-4 md:text-2xl lg:text-base`}
        >
            {children}
        </button>
    )
}

export default TextButtonFilled;