'use client'
import { Dispatch, SetStateAction } from "react";

interface CleanoutBagFilterProps {
    showCleanoutBagItems: boolean;
    setShowCleanoutBagItems: Dispatch<SetStateAction<boolean>>;
}

const CleanoutBagFilter = ({ showCleanoutBagItems, setShowCleanoutBagItems }: CleanoutBagFilterProps) => {
    const styling = (active: boolean) => active ? "bg-white" : ""

    return (
        <button
            onClick={() => setShowCleanoutBagItems(!showCleanoutBagItems)}
            className={`${styling(showCleanoutBagItems)} px-1 rounded-full text-xs border border-theme-blue text-theme-blue`}
        >
            show stuff in cleanout bag
        </button>
    )
}

export default CleanoutBagFilter;