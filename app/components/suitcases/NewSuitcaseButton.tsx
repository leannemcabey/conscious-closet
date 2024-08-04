'use client'

import NewButton from "@/app/components/buttons/NewButton";

interface NewSuitcaseButtonProps {
    handleClick: () => void;
}

const NewSuitcaseButton = ({ handleClick }: NewSuitcaseButtonProps) => {
    return (
        <div className="mt-2">
            <NewButton handleClick={() => handleClick()} />
        </div>
    )
}

export default NewSuitcaseButton;