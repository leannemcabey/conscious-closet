'use client'
import { Dispatch, SetStateAction } from "react";
import FilterButton from "@/app/components/buttons/FilterButton";

interface CleanoutBagFilterProps {
    showCleanoutBagItems: boolean;
    setShowCleanoutBagItems: Dispatch<SetStateAction<boolean>>;
}

const CleanoutBagFilter = ({ showCleanoutBagItems, setShowCleanoutBagItems }: CleanoutBagFilterProps) => {
    return (
        <FilterButton
            handleClick={() => setShowCleanoutBagItems(!showCleanoutBagItems)}
            isActive={showCleanoutBagItems}
            iconPath="/broom.svg"
            iconAlt="broom icon"
        />
    )
}

export default CleanoutBagFilter;