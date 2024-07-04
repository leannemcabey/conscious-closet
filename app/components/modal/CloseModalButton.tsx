'use client'
import { Dispatch, SetStateAction } from "react";

interface CloseModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CloseModalButton = ({ setIsOpen }: CloseModalProps) => {
    return (
        <p onClick={() => setIsOpen(false)}
           className="fixed top-4 right-4 mb-4 text-2xl text-theme-green self-end">
            x
        </p>
    )
}

export default CloseModalButton;