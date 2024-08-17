'use client'
import Image from "next/image";

interface UndevelopedPolaroidProps {
    sizeStyling?: string;
}

const UndevelopedPolaroid = ({ sizeStyling }: UndevelopedPolaroidProps) => {
    return (
        <div className={`flex flex-col items-center items-center bg-white drop-shadow-lg ${sizeStyling}`}>
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