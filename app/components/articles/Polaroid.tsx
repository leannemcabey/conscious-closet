'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface PolaroidProps {
    imageUrl: string;
    size: "small" | "medium" | "large"
}

const Polaroid = ({ imageUrl, size, children }: PolaroidProps) => {
    const styling = {
        small: {
            outerDivWidth: "w-28",
            innerDivMargin: "mt-2 mb-7",
            imageSize: {
                width: 100,
                height: 132
            },
            missingImageTextSize: "text-xs",
            missingImageInnerDiv: ""
        },
        medium: {
            outerDivWidth: "w-48",
            innerDivMargin: "mt-2 mb-10",
            imageSize: {
                width: 175,
                height: 225
            },
            missingImageTextSize: "text-md",
            missingImageInnerDiv: ""
        },
        large: {
            outerDivWidth: "w-96",
            innerDivMargin: "mt-4 mb-4",
            imageSize: {
                width: 350,
                height: 465
            },
            missingImageTextSize: "text-2xl",
            missingImageInnerDiv: "mx-2"
        }
    }

    const missingImage = (
        <div className={`${styling[size].innerDivMargin} mx-2 bg-white text-center`}>
            <div className={`flex flex-col place-content-center py-2 border border-neutral-300 ${styling[size].missingImageInnerDiv} w-[${styling[size].imageSize.width}px] h-[${styling[size].imageSize.height}px]`}>
                <Image
                    src="/hanger-error.svg"
                    width={styling[size].imageSize.width / 2}
                    height={styling[size].imageSize.height / 2}
                    alt="missing article image"
                    className="self-center mt-1"
                />
                <p className={`${styling[size].missingImageTextSize} px-1 mt-1 mb-2 text-neutral-400`}>
                    photo missing from your Google Photos
                </p>
            </div>
        </div>
    )

    return (
        <div className={`flex flex-col items-center justify-center bg-white ${styling[size].outerDivWidth} drop-shadow-lg`}>
            {imageUrl !== "" && (
                <div className={`${styling[size].innerDivMargin} bg-white`}>
                    <Image
                        loader={googlePhotosPathLoader}
                        src={imageUrl}
                        width={styling[size].imageSize.width}
                        height={styling[size].imageSize.height}
                        alt="article image"
                        className="border border-neutral-200"
                    />
                </div>
            )}

            { /*This happens when the image has been deleted from the user's Google Photos account.*/}
            {imageUrl === "" && missingImage }

            {children && (
                <div className="w-full flex mb-4 space-x-12 justify-center">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Polaroid;