'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";
import { ReactElement } from "react";

interface PolaroidProps {
    imageUrl: string;
    sizeStyling?: string;
    children?: ReactElement;
}

const Polaroid = ({ imageUrl, sizeStyling, children }: PolaroidProps) => {
    return (
        <div className={`flex flex-col items-center bg-white drop-shadow-lg ${sizeStyling} overflow-hidden`}>
            <div className={`mt-[5%] ${children ? "mb-[5%]" : "mb-[25%]"} bg-white w-[90%] overflow-hidden`}>
                <Image
                    loader={googlePhotosPathLoader}
                    src={imageUrl}
                    width={350}
                    height={465}
                    alt="article image"
                    className="border border-neutral-200 w-full"
                />
            </div>

            {children && (
                <div className="w-full flex justify-center mb-4">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Polaroid;