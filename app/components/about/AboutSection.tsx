'use client'
import { useState } from "react";
import Image from "next/image";
import CleanoutRecommendationItem from "@/app/components/cleanoutBag/CleanoutRecommendationItem";
import * as React from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

interface AboutSectionProps {
    sectionName: string;
    iconPath: string;
    iconAlt: string;
}

const AboutSection = ({ sectionName, iconPath, iconAlt, children }: AboutSectionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const arrow = isOpen ? "arrow-down-white" : "arrow-up-white";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <>
            <div
                className="flex flex-col items-center w-[96px] h-[130px] bg-white border border-theme-green text-text-green rounded-md p-2 mb-2 drop-shadow"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-[35px] h-[35px]">
                    <Image
                        src={iconPath}
                        alt={iconAlt}
                        width="35"
                        height="35"
                        className="w-full"
                    />
                </div>
                <h2 className="text-center tracking-widest mt-2 md:text-xl">{sectionName}</h2>
            </div>

            {isOpen &&
                <Modal setIsOpen={setIsOpen}>
                    <CloseModalButton setIsOpen={setIsOpen}/>
                    <h2 className="bg-theme-mid-green text-white p-1 rounded-md text-center tracking-widest mt-2 md:text-xl">{sectionName}</h2>
                    <div className="text-center text-text-green space-y-4 py-4 h-max max-h-[500px] overflow-scroll">
                        {children}
                    </div>
                </Modal>}
        </>
    )
}

export default AboutSection;