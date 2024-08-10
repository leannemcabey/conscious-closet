'use client'
import { ReactElement, useState } from "react";
import Image from "next/image";
import * as React from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

interface AboutSectionProps {
    sectionName: string;
    iconPath: string;
    iconAlt: string;
    children: ReactElement;
}

const AboutSection = ({ sectionName, iconPath, iconAlt, children }: AboutSectionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const arrow = isOpen ? "arrow-down-white" : "arrow-up-white";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <>
            <div
                className="flex flex-col items-center w-[96px] md:w-[200px] h-[130px] bg-white border border-theme-green text-text-green rounded-lg p-2 mb-2 drop-shadow"
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
                    <>
                        <CloseModalButton setIsOpen={setIsOpen}/>
                        <h2 className="bg-theme-blue text-white p-1 rounded-lg text-center tracking-widest mt-2 md:text-xl">{sectionName}</h2>
                        <div className="text-center space-y-4 py-4 h-max max-h-[500px] overflow-scroll md:text-xl md:max-h-[600px]">
                            {children}
                        </div>
                    </>
                </Modal>}
        </>
    )
}

export default AboutSection;