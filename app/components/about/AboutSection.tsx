'use client'
import { useState } from "react";
import Image from "next/image";
import CleanoutRecommendationItem from "@/app/components/cleanoutBag/CleanoutRecommendationItem";
import * as React from "react";

interface AboutSectionProps {
    sectionName: string;
}

const AboutSection = ({ sectionName, children }: AboutSectionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const arrow = isOpen ? "arrow-down-white" : "arrow-up-white";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <div className="flex flex-col mb-4 space-y-1 md:mb-8 md:space-y-2">
            <div
                className="flex sticky top-0 w-full bg-theme-green text-white rounded-md p-2 mb-2 drop-shadow"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex border border-white rounded-full items-center p-1 mr-2">
                    <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px]">
                        <Image
                            src={`/${arrow}.svg`}
                            height="14"
                            width="14"
                            alt={alt}
                            className="w-full"
                        />
                    </div>
                </div>
                <h2 className="text-center md:text-lg">{sectionName}</h2>
            </div>

            {isOpen &&
                <div className="mx-2 p-2 border border-white border-4 rounded-md space-y-4 md:space-y-6 md:text-lg">
                    {children}
                </div>}
        </div>
    )
}

export default AboutSection;