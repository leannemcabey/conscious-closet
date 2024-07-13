'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import axios from "axios";
import GalleryImage from "@/app/components/articles/new/GalleryImage";
import { createClient } from "@/utils/supabase/client";

interface ImageSelection {
    setImage: Dispatch<SetStateAction<string | undefined>>;
}

export const ImageSelection = ({ setImage }) => {
    const supabase = createClient();
    const [googlePhotos, setGooglePhotos] = useState<GooglePhotoMetadata[]>()

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
                        pageSize: "50"
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
                    })
            })
    }, []);

    const handleClick = async (image: GooglePhotoMetadata) => {
        setImage(image)
    }

    return (
        <div>
            <p className="mb-4 text-lg text-center">Select from your Google Photos</p>

            <div>
                {!googlePhotos && <div>Loading...</div>}

                {googlePhotos && (
                    <div className="h-64 overflow-scroll">
                        <div className="grid grid-cols-4 gap-2">
                            {googlePhotos!.map((photoData) =>
                                <GalleryImage
                                    photoData={photoData}
                                    handleSelection={handleClick}
                                    key={photoData.imageId}
                                />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}