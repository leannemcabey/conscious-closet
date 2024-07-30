'use client'

import Image from "next/image";
import {googlePhotosPathLoader} from "@/utils/googlePhotosPathLoader";

const UndevelopedPolaroid = () => {
    return (
        <div className="flex flex-col items-center items-center bg-white drop-shadow-lg">
            <div className={`mt-[5%] mx-[5%] mb-[25%] bg-white`}>
                <Image
                    src="/undeveloped.png"
                    width="100"
                    height="132"
                    alt="no articles in category"
                    className="border border-neutral-200 w-full"
                />
            </div>
        </div>
    )
}

export default UndevelopedPolaroid;