'use client'
import Image from "next/image";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface GalleryImageProps {
    photoData: GooglePhotoMetadata;
    handleSelection: (photoData: GooglePhotoMetadata) => void;
}

const GalleryImage = ({ photoData, handleSelection }: GalleryImageProps) => {
    const { baseUrl, imageId } = photoData

    return (
        <div className="rounded-md overflow-hidden" onClick={() => handleSelection(photoData)}>
            <Image
                loader={googlePhotosPathLoader}
                src={baseUrl}
                width={100}
                height={125}
                alt="clothing article image"
            />
        </div>
    )
}

export default GalleryImage