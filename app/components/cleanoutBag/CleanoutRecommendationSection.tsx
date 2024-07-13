'use client'
import CleanoutRecommendationItem from "@/app/components/cleanoutBag/CleanoutRecommendationItem";
import * as React from "react";
import { CleanoutRecommendation } from "@/types/cleanoutRecommendation";
import { useState } from "react";
import Image from "next/image";

interface CleanoutRecommendationSectionProps {
    sectionName: string;
    sectionRecs: CleanoutRecommendation[];
}

const CleanoutRecommendationSection = ({ sectionName, sectionRecs }: CleanoutRecommendationSectionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const arrow = isOpen ? "arrow-down-white" : "arrow-up-white";

    return (

    <div className="flex flex-col mb-4 space-y-1">
        <div
            className="flex sticky top-0 w-full bg-theme-blue text-white rounded-md p-2 drop-shadow"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex border border-white rounded-full items-center p-1 mr-2">
                <Image
                    src={`/${arrow}.svg`}
                    height="14"
                    width="14"
                    alt={arrow}
                />
            </div>
            <h2>{sectionName}</h2>
        </div>

            {isOpen && sectionRecs.map((rec) => {
                return <CleanoutRecommendationItem recommendation={rec}/>
            }
            )}
        </div>
    )
}

export default CleanoutRecommendationSection;