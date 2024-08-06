'use client'
import Image from "next/image";

interface UndevelopedPolaroidProps {
    // size: "small" | "medium" | "large";
    sizeStyling: { width: string, height: string }
}

const UndevelopedPolaroid = ({ sizeStyling }: UndevelopedPolaroidProps) => {
    // const imageSize = {
    //     small: {
    //         width: 80,
    //         height: 120
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

    // const sizeStyling = size === "large" ? "w-[250px]" : "w-[63.5px]"

    return (
        <div className={`flex flex-col items-center items-center bg-white drop-shadow-lg ${sizeStyling.width} ${sizeStyling.height}`}>
            <div className={`mt-[5%] mb-[25%] bg-white w-[90%]`}>
                <Image
                    src="/undeveloped.png"
                    width={100}
                    height={180}
                    alt="empty image"
                    className="border border-neutral-200 w-full"
                />
            </div>
        </div>
    )
}

export default UndevelopedPolaroid;