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
            innerDivMargin: "mt-[7%] mb-7",
            imageSize: {
                width: 100,
                height: 132
            }
        },
        medium: {
            outerDivWidth: "w-48",
            innerDivMargin: "mt-[7%] mb-10",
            imageSize: {
                width: 175,
                height: 225
            }
        },
        large: {
            outerDivWidth: "w-96",
            innerDivMargin: "mt-[7%] mb-4",
            imageSize: {
                width: 350,
                height: 465
            }
        }
    }

    return (
        <div className={`flex flex-col items-center bg-white w-full drop-shadow-lg`}>
            <div className={`${styling[size].innerDivMargin} w-[88%] bg-white`}>
                <Image
                    loader={googlePhotosPathLoader}
                    src={imageUrl}
                    width={styling[size].imageSize.width}
                    height={styling[size].imageSize.height}
                    alt="article image"
                    className="border border-neutral-200"
                />
            </div>

            {children && (
                <div className="w-[90%] flex mb-4 place-content-between">
                    {children}
                </div>
            )}
        </div>
    )
}

export default Polaroid;