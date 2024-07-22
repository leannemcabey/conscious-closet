'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import axios from "axios";
import GalleryImage from "@/app/components/articles/new/GalleryImage";
import Image from "next/image";
import { refreshGoogleProviderTokenIfNeeded } from "@/utils/refreshGoogleProviderTokenIfNeeded";

interface ImageSelection {
    setImage: Dispatch<SetStateAction<string | undefined>>;
}

export const ImageSelection = ({ setImage }) => {
    const [googlePhotos, setGooglePhotos] = useState<GooglePhotoMetadata[]>()
    const [pageTokens, setPageTokens] = useState<string|undefined[]>([]);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        refreshGoogleProviderTokenIfNeeded()
            .then((providerToken) => {
                if (providerToken) {
                    axios.get("https://photoslibrary.googleapis.com/v1/mediaItems", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + providerToken
                        },
                        params: {
                            pageSize: "16",
                            pageToken: pageTokens[page - 1]
                        }
                    })
                        .then((response) => {
                            const data = response.data.mediaItems.map((item: any) => {
                                return {
                                    baseUrl: item.baseUrl,
                                    imageId: item.id
                                }
                            })
                            setGooglePhotos(data)
                            setPageTokens([ ...pageTokens, response.data.nextPageToken])
                        })
                }
            })
    }, [page]);

    const handleClick = async (image: GooglePhotoMetadata) => {
        setImage(image)
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <Image src="/google-photos-icon.png" height="50" width="50" alt="Google Photos icon" />

            <div className="flex justify-center h-[415px]">
                {!googlePhotos &&
                    <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin mt-10" />
                }

                {googlePhotos && (
                    <div className="flex flex-col">
                        <div className="h-[345px] grid grid-cols-4 gap-2">
                            {googlePhotos!.map((photoData) =>
                                <GalleryImage
                                    photoData={photoData}
                                    handleSelection={handleClick}
                                    key={photoData.imageId}
                                />)}
                        </div>

                        <div className="flex content-end place-content-between mt-8">
                            <button
                                className={`${page === 0 && "invisible"} border border-theme-green bg-white text-theme-green rounded-md p-1 w-20 drop-shadow`}
                                onClick={() => setPage(page - 1)}
                            >
                                previous
                            </button>
                            <button
                                className={`${pageTokens[pageTokens.length -1] === undefined && "invisible"} border border-theme-green bg-white text-theme-green rounded-md p-1 w-20 drop-shadow`}
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