'use client'
import { Dispatch, SetStateAction } from "react";
import IconButton from "@/app/components/buttons/IconButton";

interface CleanoutBagFilterProps {
    showCleanoutBagItems: boolean;
    setShowCleanoutBagItems: Dispatch<SetStateAction<boolean>>;
}

const CleanoutBagFilter = ({ showCleanoutBagItems, setShowCleanoutBagItems }: CleanoutBagFilterProps) => {
    return (
        <IconButton
            handleClick={() => setShowCleanoutBagItems(!showCleanoutBagItems)}
            isActive={showCleanoutBagItems}
            iconPath="/broom.svg"
            iconAlt="broom icon"
        />
    )
}

export default CleanoutBagFilter;