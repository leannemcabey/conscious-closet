'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface PolaroidProps {
    imageUrl: string;
    size: "small" | "medium" | "large"
}

const Polaroid = ({ imageUrl, size, children }: PolaroidProps) => {
    const outerDivWidth = {
        small: "w-28",
        medium: "w-48",
        large: "w-96"
    };

    const innerDivMargin = {
        small: "mt-2 mb-7",
        medium: "mt-2 mb-10",
        large: "mt-4 mb-4"
    };

    // Note that the heights are ignored and instead automatically adjusted
    // based on the image ratio, but height is a required prop for Next Image
    const imageSize = {
        small: {
            width: 100,
            height: 150
        },
        medium: {
            width: 175,
            height: 225
        },
        large: {
            width: 350,
            height: 400
        }
    }

    return  (
        <div className={`flex flex-col items-center justify-center bg-white ${outerDivWidth[size]} drop-shadow-lg`}>
            <div className={`${innerDivMargin[size]} bg-white`}>
                <Image
                    loader={googlePhotosPathLoader}
                    src={imageUrl}
                    width={imageSize[size].width}
                    height={imageSize[size].height}
                    alt="article image"
                    className="border border-neutral-200"
                />
            </div>

            {children && (
                <div className="w-full flex mb-4 space-x-12 justify-center">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Polaroid;