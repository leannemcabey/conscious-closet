'use client'
import Image, {ImageLoader} from "next/image";

interface UndevelopedPolaroidProps {
    size: "small" | "medium" | "large";
}

const UndevelopedPolaroid = ({ size }: UndevelopedPolaroidProps) => {
    const imageSize = {
        small: {
            width: 80,
            height: 120
        },
        medium: {
            width: 175,
            height: 225
        },
        large: {
            width: 350,
            height: 465
        }
    }

    const sizeStyling = size === "large" ? "w-[297px]" : "w-[70px]"

    return (
        <div className={`flex flex-col items-center items-center bg-white drop-shadow-lg ${sizeStyling}`}>
            <div className={`mt-[5%] mb-[25%] bg-white w-[90%]`}>
                <Image
                    src="/undeveloped.png"
                    width={100}
                    height={150}
                    alt="empty image"
                    className="border border-neutral-200 w-full"
                />
            </div>
        </div>
    )
}

export default UndevelopedPolaroid;