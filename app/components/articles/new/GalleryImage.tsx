'use client'
import Image from "next/image";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface GalleryImageProps {
    photoData: GooglePhotoMetadata;
    handleSelection: (photoData: GooglePhotoMetadata) => void;
}

const GalleryImage = ({ photoData, handleSelection }: GalleryImageProps) => {
    const { baseUrl } = photoData

    return (
        <div className="overflow-hidden md:w-[100px]" onClick={() => handleSelection(photoData)}>
            <Image
                loader={googlePhotosPathLoader}
                src={baseUrl}
                width={100}
                height={125}
                alt="clothing article image"
                className="w-full"
            />
        </div>
    )
}

export default GalleryImage