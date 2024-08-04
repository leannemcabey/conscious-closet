import * as React from "react";
import Image from "next/image";

interface NewButtonProps {
    handleClick: () => void;
    // iconPath: string;
    // iconAlt: string;
}

const NewButton = ({ handleClick, iconPath, iconAlt }: NewButtonProps) => {
    return (
        <button
            onClick={() => handleClick()}
            className="flex flex-col justify-center h-10 w-10 bg-white border border-theme-green rounded-lg drop-shadow md:h-16 md:w-16"
        >
            <Image
                src="/plus.svg"
                height={40}
                width={40}
                alt="create new"
                className="w-[70%] self-center"
            />
        </button>
    )
}

export default NewButton;