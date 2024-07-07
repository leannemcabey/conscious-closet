'use client'
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface NewSuitcaseButtonProps {
    setIsCreatingSuitcase: Dispatch<SetStateAction<boolean>>
}

const NewSuitcaseButton = ({ setIsCreatingSuitcase }: NewSuitcaseButtonProps) => {
    return (
            <button
                className="rounded-md bg-white border border-theme-light-green w-full py-1 mb-4 drop-shadow text-theme-green text-lg"
                onClick={() => setIsCreatingSuitcase(true)}
            >
                +
            </button>
    )
}

export default NewSuitcaseButton;