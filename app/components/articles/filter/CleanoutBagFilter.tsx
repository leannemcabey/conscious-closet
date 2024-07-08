'use client'
import { Dispatch, SetStateAction } from "react";

interface CleanoutBagFilterProps {
    showCleanoutBagItems: boolean;
    setShowCleanoutBagItems: Dispatch<SetStateAction<boolean>>;
}

const CleanoutBagFilter = ({ showCleanoutBagItems, setShowCleanoutBagItems }: CleanoutBagFilterProps) => {
    const styling = (active: boolean) => active ? "bg-white" : ""

    return (
        <div
            onClick={() => setShowCleanoutBagItems(!showCleanoutBagItems)}
            className={`${styling(showCleanoutBagItems)} px-2 py-1 rounded-full text-sm border border-theme-blue text-theme-blue`}
        >
            <p className="mt-0.5">show stuff in cleanout bag</p>
        </div>
    )
}

export default CleanoutBagFilter;