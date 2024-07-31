import * as React from "react";

interface NewButtonProps {
    handleClick: () => void;
}

const NewButton = ({ handleClick }: NewButtonProps) => {
    return (
        <button
            onClick={() => handleClick()}
            className="fixed bottom-5 right-5 h-10 w-10 rounded-full bg-theme-green text-white drop-shadow md:h-16 md:w-16"
        >
            <p className="mb-1 text-lg md:text-3xl">+</p>
        </button>
    )
}

export default NewButton;