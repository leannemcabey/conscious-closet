'use client'
import { cleanoutRecommendations } from "@/constants/cleanoutRecommendations";
import * as React from "react";
import CleanoutRecommendationSection from "@/app/components/cleanoutBag/CleanoutRecommendationSection";
import {useState} from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

const CleanoutRecommendationsContainer = () => {
    const [showAddRecModal, setShowAddRecModal] = useState<boolean>();

    return (
        <div className="flex flex-col mt-1 h-[85%]">
            <div className="text-xs text-center bg-white rounded-md p-2">
                <p className="mb-2">
                    Did you know the world produces an estimated
                    <span className="font-bold"> 92 million tons </span>
                     of textile waste each year?
                </p>
                <p>Don't let your stuff end up in a landfill.</p>
                <p className="text-theme-green">Recycle, donate, or thrift instead.</p>
            </div>


            <div className="my-4 h-full overflow-scroll">
                <CleanoutRecommendationSection sectionName="recycling" sectionRecs={cleanoutRecommendations.recycling} />
                <CleanoutRecommendationSection sectionName="donating" sectionRecs={cleanoutRecommendations.donating} />
                <CleanoutRecommendationSection sectionName="thrifting" sectionRecs={cleanoutRecommendations.thrifting} />
            </div>

            <button
                onClick={() => setShowAddRecModal(true)}
                className="fixed bottom-5 right-5 h-8 w-8 rounded-full bg-neutral-700 text-white drop-shadow"
            >
                <p className="mb-1">+</p>
            </button>

            {showAddRecModal && (
                <Modal setIsOpen={setShowAddRecModal}>
                    <CloseModalButton setIsOpen={setShowAddRecModal} />
                    <div className="mt-12 text-center space-y-4">
                        <p>
                            Know of another great company or organization?
                        </p>

                        <p>
                            Email us at
                            <span className="font-bold text-theme-mid-green"> leanne@consciouscloset.co</span>
                            !
                        </p>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default CleanoutRecommendationsContainer;