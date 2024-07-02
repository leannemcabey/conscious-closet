'use client'
import { Suitcase } from "@/types/Suitcase";
import Image from "next/image";
import {Dispatch, SetStateAction, useState} from "react";
import Link from "next/link";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";

interface AddToSuitcaseMenuProps {
    articleId: string;
    suitcases: Suitcase[];
    selectedSuitcases: string[];
    setSelectedSuitcases: Dispatch<SetStateAction<string[] | undefined>>;
}

const AddToSuitcaseMenu = ({ articleId, suitcases, selectedSuitcases, setSelectedSuitcases }: AddToSuitcaseMenuProps) => {
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

    const menuElement= (suitcase: Suitcase) => (
        <div onClick={() => adjustSuitcaseSelection(suitcase.id)} className="flex space-x-2">
            <div className="min-w-7 max-w-7 min-h-7 max-w-7 rounded-full border border-theme-green">
                <Image
                    src="/check-mark-button.svg"
                    height="28"
                    width="28"
                    alt="checkmark"
                    className={suitcaseIsSelected(suitcase.id) ? "" : "hidden"}
                />
            </div>
            <span>{suitcase.name}</span>
        </div>
    )

    return (
        <div className="mx-2">
            <p className="text-xl mb-4 font-semibold">Select suitcase(s):</p>
            <NewSuitcaseButton />
            <div className="flex flex-col space-y-2">
                {suitcases.map((suitcase) => menuElement(suitcase))}
            </div>
        </div>
    )
}

export default AddToSuitcaseMenu;