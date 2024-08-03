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
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const arrow = isOpen ? "arrow-down-white" : "arrow-up-white";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <div className="flex flex-col mb-4 space-y-2">
            <div
                className="flex sticky top-0 w-full bg-theme-blue text-white rounded-md p-2 drop-shadow"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex border border-white rounded-full items-center p-1 mr-2 w-[20px] h-[20px] md:p-2 md:w-[35px] md:h-[35px]">
                    <Image
                        src={`/${arrow}.svg`}
                        height="20"
                        width="20"
                        alt={alt}
                        className="w-full"
                    />
                </div>
                <h2 className="text-sm md:text-xl md:mt-1">{sectionName}</h2>
            </div>

                {isOpen && sectionRecs.map((rec) => {
                    return <CleanoutRecommendationItem recommendation={rec} key={rec.name}/>
                }
                )}
        </div>
    )
}

export default CleanoutRecommendationSection;