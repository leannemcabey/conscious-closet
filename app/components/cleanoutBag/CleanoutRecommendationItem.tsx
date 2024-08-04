'use client'
import Image from "next/image";
import { useState } from "react";
import { CleanoutRecommendation } from "@/types/cleanoutRecommendation";
import TextButton from "@/app/components/buttons/TextButton";

interface CleanoutRecommendationItemProps {
    recommendation: CleanoutRecommendation
}

const CleanoutRecommendationItem = ({ recommendation }: CleanoutRecommendationItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const arrow = isOpen ? "arrow-down" : "arrow-up";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <div className="ml-2 py-2.5 text-sm md:text-lg">
            <div className="flex" onClick={() => setIsOpen(!isOpen)}>
                <div className="mr-3 ml-1 w-[10px] h-[10px] md:w-[15px] md:h-[15px]">
                    <Image src={`/${arrow}.svg`} height="10" width="10" alt={alt} className="mt-1 w-full"/>
                </div>
                <h3>{recommendation.name}</h3>
            </div>

            {isOpen && (
                <div className="mt-2 mx-4 bg-white rounded-lg p-2">
                    {recommendation.url && (
                            <a href={recommendation.url} target="_blank">
                                <TextButton disabled={false} handleClick={() => {}} removeDropShadow={true} >
                                    <Image src={`/external-link-icon.svg`} height="10" width="10" alt={arrow} className="mr-2"/>
                                    <p>{recommendation.name}</p>
                                </TextButton>
                            </a>
                    )}
                    <p className="mt-2">{recommendation.description}</p>
                </div>
    )
}
</div>
)
}

export default CleanoutRecommendationItem;