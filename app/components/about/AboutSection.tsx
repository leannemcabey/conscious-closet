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
        <div className="flex flex-col mb-4 space-y-1">
            <div
                className="flex sticky top-0 w-full bg-theme-mid-green text-white rounded-md p-2 mb-2 drop-shadow"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex border border-white rounded-full items-center p-1 mr-2">
                    <Image
                        src={`/${arrow}.svg`}
                        height="14"
                        width="14"
                        alt={alt}
                    />
                </div>
                <h2 className="text-center">{sectionName}</h2>
            </div>

            {isOpen &&
                <div className="mx-2 p-2 border border-white border-4 rounded-md space-y-4">
                    {children}
                </div>}
        </div>
    )
}

export default AboutSection;