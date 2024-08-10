'use client'
import { cleanoutRecommendations } from "@/constants/cleanoutRecommendations";
import * as React from "react";
import CleanoutRecommendationSection from "@/app/components/cleanoutBag/CleanoutRecommendationSection";
import {useState} from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import NewButton from "@/app/components/buttons/NewButton";

const CleanoutRecommendationsContainer = () => {
    const [showAddRecModal, setShowAddRecModal] = useState<boolean>(false);

    return (
        <div className="flex flex-col mt-1 h-[90%]">
            <div className="text-xs text-center bg-white rounded-lg p-2 md:text-base">
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

            {/*<NewButton handleClick={() => setShowAddRecModal(true)} />*/}

            {showAddRecModal && (
                <Modal setIsOpen={setShowAddRecModal}>
                    <>
                        <CloseModalButton setIsOpen={setShowAddRecModal} />
                        <div className="mt-12 text-center space-y-4 md:space-y-8 md:text-2xl">
                            <p>
                                Know of another great company or organization?
                            </p>

                            <p>
                                Email us at
                                <a
                                    className="text-theme-blue"
                                    href="mailto:leanne@consciouscloset.co"> leanne@consciouscloset.co
                                </a>
                                !
                            </p>
                        </div>
                    </>
                </Modal>
            )}
        </div>
    )
}

export default CleanoutRecommendationsContainer;