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
            className={`${styling(showCleanoutBagItems)} px-2 mr-1 h-8 rounded-full text-sm border border-theme-blue text-theme-blue truncate md:text-2xl md:px-4 md:h-12`}
        >
            show stuff in cleanout bag
        </button>
    )
}

export default CleanoutBagFilter;