'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface PolaroidProps {
    imageUrl: string;
    sizeStyling: { width: string, height: string }
    // size: "small" | "medium" | "large"
}

const Polaroid = ({ imageUrl, sizeStyling, children }: PolaroidProps) => {
    // const imageSize = {
    //     small: {
    //         width: 100,
    //         height: 132
    //     },
    //     medium: {
    //         width: 175,
    //         height: 225
    //     },
    //     large: {
    //         width: 350,
    //         height: 465
    //     }
    // }

    // const sizeStyling = size === "large" ? "w-[250px] md:w-[445px]" : "w-[63.5px]"
    // ${size === "large" && "md:w-[400px]"}

    return (
        <div className={`flex flex-col items-center bg-white drop-shadow-lg ${sizeStyling.width} ${sizeStyling.height}`}>
            <div className={`mt-[5%] mx-[5%] ${children ? "mb-[5%]" : "mb-[25%]"} bg-white`}>
                <Image
                    loader={googlePhotosPathLoader}
                    src={imageUrl}
                    width={350}
                    height={465}
                    alt="article image"
                    className="border border-neutral-200 md:w-full"
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