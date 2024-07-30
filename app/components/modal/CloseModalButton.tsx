'use client'
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface CloseModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CloseModalButton = ({ setIsOpen }: CloseModalProps) => {
    return (
        <div onClick={() => setIsOpen(false)} className="fixed top-4 right-4 mb-4 text-2xl self-end">
            <Image
                src="/close.svg"
                width="15"
                height="15"
                alt="close"
            />
        </div>
    )
}

export default CloseModalButton;