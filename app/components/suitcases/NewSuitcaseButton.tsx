'use client'

interface NewSuitcaseButtonProps {
    handleClick: () => void;
}

const NewSuitcaseButton = ({ handleClick }: NewSuitcaseButtonProps) => {
    return (
        <>
            <button
                className="rounded-md bg-theme-green w-full max-w-[350px] self-center py-1 mb-4 drop-shadow text-white text-lg md:text-2xl"
                onClick={() => handleClick()}
            >
                +
            </button>
        </>
    )
}

export default NewSuitcaseButton;