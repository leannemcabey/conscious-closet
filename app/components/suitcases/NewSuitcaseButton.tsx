'use client'

interface NewSuitcaseButtonProps {
    handleClick: () => void;
}

const NewSuitcaseButton = ({ handleClick }: NewSuitcaseButtonProps) => {
    return (
        <>
            <button
                className="rounded-md bg-white border border-theme-light-green w-full py-1 mb-4 drop-shadow text-theme-green text-lg"
                onClick={() => handleClick()}
            >
                +
            </button>
        </>
    )
}

export default NewSuitcaseButton;