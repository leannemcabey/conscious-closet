'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import axios from "axios";
import GalleryImage from "@/app/components/articles/new/GalleryImage";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

interface ImageSelection {
    setImage: Dispatch<SetStateAction<string | undefined>>;
}

export const ImageSelection = ({ setImage }) => {
    const supabase = createClient();
    const [googlePhotos, setGooglePhotos] = useState<GooglePhotoMetadata[]>()
    const [nextPageToken, setNextPageToken] = useState<string>();
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        supabase.auth.getSession()
            .then((session) => {
                const providerToken = session.data.session?.provider_token;

                axios.get("https://photoslibrary.googleapis.com/v1/mediaItems", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + providerToken
                    },
                    params: {
                        pageSize: "25",
                        pageToken: nextPageToken
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
                        setNextPageToken(response.data.nextPageToken)
                    })
            })
    }, [page]);

    const handleClick = async (image: GooglePhotoMetadata) => {
        setImage(image)
    }

    return (
        <div>
            <p className="mb-4 text-lg text-center">Select from your Google Photos</p>

            <div className="flex justify-center">
                {!googlePhotos &&
                    <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin mt-10" />
                }

                {googlePhotos && (
                    <div className="h-[450px] overflow-scroll">
                        <div className="grid grid-cols-4 gap-2">
                            {googlePhotos!.map((photoData) =>
                                <GalleryImage
                                    photoData={photoData}
                                    handleSelection={handleClick}
                                    key={photoData.imageId}
                                />)}
                        </div>

                        <button
                            className="bg-theme-blue rounded-md p-1"
                            onClick={() => setPage(page + 1)}
                        >
                            next page
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}