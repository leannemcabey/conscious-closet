'use client'
import Image from "next/image";
import { useState } from "react";
import { CleanoutRecommendation } from "@/types/cleanoutRecommendation";

interface CleanoutRecommendationItemProps {
    recommendation: CleanoutRecommendation
}

const CleanoutRecommendationItem = ({ recommendation }: CleanoutRecommendationItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const arrow = isOpen ? "arrow-up" : "arrow-down";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <div className="ml-2 py-1">
            <div className="flex" onClick={() => setIsOpen(!isOpen)}>
                <Image src={`/${arrow}.svg`} height="14" width="14" alt={alt} className="mr-2"/>
                <h3>{recommendation.name}</h3>
            </div>

            {isOpen && (
                <div className="mt-2 mx-4 bg-white rounded-md p-2">
                    {recommendation.url && (
                            <a href={recommendation.url} target="_blank">
                                <button className="flex items-center border border-theme-blue rounded-full px-2 w-max" >
                                    <Image src={`/external-link-icon.svg`} height="14" width="14" alt={arrow} className="mr-2"/>
                                    <p>{recommendation.name}</p>
                                </button>
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