'use client'
import Image from "next/image";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface GalleryImageProps {
    photoData: GooglePhotoMetadata;
    alreadyInCloset: boolean;
    handleSelection: (photoData: GooglePhotoMetadata) => void;
}

const GalleryImage = ({ photoData, alreadyInCloset, handleSelection }: GalleryImageProps) => {
    const { baseUrl } = photoData

    const handleClick = () => {
        if (!alreadyInCloset) handleSelection(photoData);
    }

    return (
        <div className="flex">
            <div className={`max-h-[140px] overflow-hidden ${alreadyInCloset && "opacity-30"}`}>
                <Image
                    loader={googlePhotosPathLoader}
                    src={baseUrl}
                    width={100}
                    height={125}
                    alt="clothing article image"
                    onClick={() => handleClick()}
                />
            </div>

            {alreadyInCloset &&
                <Image
                    src="/check-mark-button-green.svg"
                    height={25}
                    width={25}
                    alt="already in closet"
                    className="self-start ml-[-28px] mt-[3px] bg-white rounded-full z-50"
                />
            }
        </div>
    )
}

export default GalleryImage