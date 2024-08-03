'use client'
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface CleanoutBagFilterProps {
    showCleanoutBagItems: boolean;
    setShowCleanoutBagItems: Dispatch<SetStateAction<boolean>>;
}

const CleanoutBagFilter = ({ showCleanoutBagItems, setShowCleanoutBagItems }: CleanoutBagFilterProps) => {
    return (
        <div
            onClick={() => setShowCleanoutBagItems(!showCleanoutBagItems)}
            className={`flex justify-center p-2 rounded-full border border-theme-blue rounded-full ${showCleanoutBagItems && "bg-white"} drop-shadow w-[40px] md:w-[50px]`}
        >
            <Image
                src="/broom.svg"
                height={40}
                width={40}
                alt="broom icon"
                className="w-full"/>
        </div>
    )
}

export default CleanoutBagFilter;