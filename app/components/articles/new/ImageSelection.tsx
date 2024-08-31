'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import GalleryImage from "@/app/components/articles/new/GalleryImage";
import Image from "next/image";
import { getPaginatedMediaItemsWithRetry } from "@/app/googleService/client/getPaginatedMediaItems";
import ErrorModal from "@/app/components/modal/ErrorModal";
import TextButton from "@/app/components/buttons/TextButton";

interface ImageSelectionProps {
    setImage: Dispatch<SetStateAction<GooglePhotoMetadata | undefined>>;
}

export const ImageSelection = ({ setImage }: ImageSelectionProps) => {
    const [googlePhotos, setGooglePhotos] = useState<GooglePhotoMetadata[]>()
    const [pageTokens, setPageTokens] = useState<(string|undefined)[]>([]);
    const [page, setPage] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred while retrieving your Google Photos. Please try again."

    useEffect(() => {
        getPaginatedMediaItemsWithRetry(pageTokens[page - 1])
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
            <div className="flex items-center text-lg md:text-2xl space-x-1 mb-2">
                <Image src="/google-photos-icon.png" height="40" width="40" alt="Google Photos icon" />
                <h2>Select from your <span className="text-nowrap">Google Photos</span></h2>
            </div>

            <div className="flex justify-center">
                {!googlePhotos &&
                    <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin mt-10" />
                }

                {googlePhotos && (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-1">
                            {googlePhotos!.map((photoData) =>
                                <GalleryImage
                                    photoData={photoData}
                                    handleSelection={handleClick}
                                    key={photoData.imageId}
                                />)}
                        </div>

                        <p className="mt-2 text-center text-xs md:text-base text-neutral-400">Google Photos™ photo storage and organizing platform is a trademark of Google LLC.</p>

                        <div className="flex content-end place-content-between mt-8">
                            <TextButton
                                widthStyling="w-20"
                                disabled={page === 0}
                                handleClick={() => setPage(page - 1)}
                            >
                                previous
                            </TextButton>

                            <TextButton
                                widthStyling="w-20"
                                disabled={pageTokens[pageTokens.length -1] === undefined}
                                handleClick={() => setPage(page + 1)}
                            >
                                next
                            </TextButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}