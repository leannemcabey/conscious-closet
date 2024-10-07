'use client'
import { Dispatch, SetStateAction } from "react";
import IconButton from "@/app/components/buttons/IconButton";
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
            iconPath={showCleanoutBagItems ? "/broom.svg" : "/broom-gray.svg"}
            iconAlt="broom icon"
        />
    )
}

export default CleanoutBagFilter;