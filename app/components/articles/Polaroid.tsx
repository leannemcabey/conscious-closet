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
            innerDivMargin: "mt-[7%] mb-7",
            imageSize: {
                width: 100,
                height: 132
            }
        },
        medium: {
            innerDivMargin: "mt-[7%] mb-10",
            imageSize: {
                width: 175,
                height: 225
            }
        },
        large: {
            innerDivMargin: "mt-[6%] mb-[5%]",
            imageSize: {
                width: 350,
                height: 465
            }
        }
    }

    return (
        <div className={`flex flex-col items-center bg-white md:h-full md:w-full drop-shadow-lg`}>
            <div className={`${styling[size].innerDivMargin} w-[88%] md:h-full bg-white`}>
                <Image
                    loader={googlePhotosPathLoader}
                    src={imageUrl}
                    width={styling[size].imageSize.width}
                    height={styling[size].imageSize.height}
                    alt="article image"
                    className="border border-neutral-200 md:h-[93%] md:w-full"
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