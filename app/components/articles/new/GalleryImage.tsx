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

    return (
        <div className="flex">
            <div className="max-h-[140px] overflow-hidden">
                <Image
                    loader={googlePhotosPathLoader}
                    src={baseUrl}
                    width={100}
                    height={125}
                    alt="clothing article image"
                    onClick={() => handleSelection(photoData)}
                />
            </div>

            {alreadyInCloset &&
                <Image
                    src="/check-mark-button-green.svg"
                    height={25}
                    width={25}
                    alt="already in closet"
                    className="self-start ml-[-28px] mt-[3px] bg-white rounded-full"
                />
            }
        </div>
    )
}

export default GalleryImage