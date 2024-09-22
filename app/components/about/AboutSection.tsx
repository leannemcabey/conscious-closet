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
    const [wasOpened, setWasOpened] = useState<boolean>(false);

    const handleClick = () => {
        setWasOpened(true);
        setIsOpen(true);
    }

    return (
        <>
            <div
                className={`${!wasOpened ? "animate-pulse" : ""} flex flex-col items-center w-[96px] md:w-[200px] h-[115px] bg-theme-green rounded-lg p-2 mb-2 drop-shadow`}
                onClick={() => handleClick()}
            >
                <div className="w-[25px] h-[25px]">
                    <Image
                        src={iconPath}
                        alt={iconAlt}
                        width="25"
                        height="25"
                        className="w-full"
                    />
                </div>
                <h2 className="text-white text-sm text-center tracking-widest mt-2">{sectionName}</h2>
            </div>

            {isOpen &&
                <Modal setIsOpen={setIsOpen}>
                    <>
                        <CloseModalButton setIsOpen={setIsOpen}/>
                        <h2 className="text-theme-green text-center tracking-widest text-lg mt-2 md:text-xl">{sectionName}</h2>
                        <div className="text-center space-y-4 py-4 h-max max-h-[500px] overflow-scroll md:text-xl md:max-h-[600px]">
                            {children}
                        </div>
                    </>
                </Modal>}
        </>
    )
}

export default AboutSection;