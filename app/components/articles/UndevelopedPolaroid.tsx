'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";


const UndevelopedPolaroid = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-white w-28 drop-shadow-lg">
            <div className="mt-2 mb-7 bg-white">
                <div className={`bg-neutral-800 border border-neutral-200 w-[100px] h-[132px]`}>
                </div>
            </div>
        </div>
    )
}

export default UndevelopedPolaroid;