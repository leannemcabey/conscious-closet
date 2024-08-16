'use client'
import { Suitcase } from "@/types/suitcase";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";

interface AddToSuitcaseMenuProps {
    suitcases: Suitcase[];
    selectedSuitcases: string[];
    setSelectedSuitcases: Dispatch<SetStateAction<string[] | undefined>>;
}

const SuitcaseOptions = ({ suitcases, selectedSuitcases, setSelectedSuitcases }: AddToSuitcaseMenuProps) => {
    const suitcaseIsSelected = (suitcaseId: string): boolean => selectedSuitcases.includes(suitcaseId);

    const adjustSuitcaseSelection = (suitcaseId: string) => {
        let newList: string[];

        if (suitcaseIsSelected(suitcaseId)) {
            const copy = [...selectedSuitcases]
            newList = copy.filter((id) => id !== suitcaseId);
        } else {
            const copy = [...selectedSuitcases]
            newList = [...copy, suitcaseId]
        }

        setSelectedSuitcases(newList)
    }

    const option = (suitcase: Suitcase) => (
        <div key={suitcase.id} onClick={() => adjustSuitcaseSelection(suitcase.id)} className="flex space-x-2">
            <div className="min-w-7 max-w-7 min-h-7 max-h-7 lg:min-w-6 lg:max-w-6 lg:min-h-6 lg:max-h-6 rounded-full border border-theme-blue">
                <Image
                    src="/check-mark-button.svg"
                    height="28"
                    width="28"
                    alt="checkmark"
                    className={`w-full ${suitcaseIsSelected(suitcase.id) ? "" : "hidden"}`}
                />
            </div>
            <span className="truncate text-base md:text-xl lg:text-base">{suitcase.name}</span>
        </div>
    )

    return (
        <div className="h-72 mt-4 overflow-auto md:h-96">
            <div className="flex flex-col space-y-2">
                {suitcases.map((suitcase) => option(suitcase))}
            </div>
        </div>
    )
}

export default SuitcaseOptions;