'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import GalleryImage from "@/app/components/articles/new/GalleryImage";
import Image from "next/image";
import { getPaginatedMediaItems } from "@/app/googleService/client/getPaginatedMediaItems";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface ImageSelectionProps {
    setImage: Dispatch<SetStateAction<GooglePhotoMetadata>>;
}

export const ImageSelection = ({ setImage }: ImageSelectionProps) => {
    const [googlePhotos, setGooglePhotos] = useState<GooglePhotoMetadata[]>()
    const [pageTokens, setPageTokens] = useState<string|undefined[]>([]);
    const [page, setPage] = useState<number>(0);
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred while retrieving your Google Photos. Please try again."

    useEffect(() => {
        getPaginatedMediaItems(pageTokens[page - 1])
            .then(({ data, nextPageToken }) => {
                setGooglePhotos(data)
                setPageTokens([ ...pageTokens, nextPageToken])
            })
            .catch(() => setError(true))
    }, [page]);

    const handleClick = async (image: GooglePhotoMetadata) => {
        setImage(image)
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    if (!error) return (
        <div className="flex flex-col items-center space-y-4 md:space-y-8">
            <Image src="/google-photos-icon.png" height="50" width="50" alt="Google Photos icon" />

            <div className="flex justify-center">
                {!googlePhotos &&
                    <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin mt-10" />
                }

                {googlePhotos && (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-4 gap-1">
                            {googlePhotos!.map((photoData) =>
                                <GalleryImage
                                    photoData={photoData}
                                    handleSelection={handleClick}
                                    key={photoData.imageId}
                                />)}
                        </div>

                        <div className="flex content-end place-content-between mt-8">
                            <button
                                className={`${page === 0 && "invisible"} border border-theme-green bg-white text-theme-green rounded-md p-1 w-20 drop-shadow md:text-lg`}
                                onClick={() => setPage(page - 1)}
                            >
                                previous
                            </button>
                            <button
                                className={`${pageTokens[pageTokens.length -1] === undefined && "invisible"} border border-theme-green bg-white text-theme-green rounded-md p-1 w-20 drop-shadow md:text-lg`}
                                onClick={() => setPage(page + 1)}
                            >
                                next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}