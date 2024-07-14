'use client'
import { cleanoutRecommendations } from "@/constants/cleanoutRecommendations";
import * as React from "react";
import CleanoutRecommendationSection from "@/app/components/cleanoutBag/CleanoutRecommendationSection";

const CleanoutRecommendationsContainer = () => {
    return (
        <div className="h-full mt-6">
            <div className="text-center border border-theme-green bg-white rounded-md p-4">
                <p className="text-lg mb-6">
                    Did you know the world produces an estimated
                    <span className="font-bold"> 92 million tons </span>
                     of textile waste each year?
                </p>
                <p>Don't let your stuff end up in a landfill.</p>
                <p className="text-lg font-bold text-theme-green">Recycle, donate, or thrift instead.</p>
            </div>

            <div className="my-4 h-1/2 overflow-scroll">
                <CleanoutRecommendationSection sectionName="recycling" sectionRecs={cleanoutRecommendations.recycling} />
                <CleanoutRecommendationSection sectionName="donating" sectionRecs={cleanoutRecommendations.donating} />
                <CleanoutRecommendationSection sectionName="thrifting" sectionRecs={cleanoutRecommendations.thrifting} />
            </div>

            <p className="text-center p-1 border border-theme-blue rounded-md">
                Know of another great company or organization? Email us at
                <span className="font-bold"> leanne@consciouscloset.co</span>
                !
            </p>
        </div>
    )
}

export default CleanoutRecommendationsContainer;