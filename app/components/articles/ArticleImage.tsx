'use client'
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";

interface ArticleImageProps {
    externalImageId: string;
}

const ArticleImage = ({ externalImageId }: ArticleImageProps) => {
    const supabase = createClient();
    const [googlePhotoMetadata, setGooglePhotoMetadata] = useState<GooglePhotoMetadata>();

    useEffect(() => {
        supabase.auth.getSession()
            .then((session) => {
                const providerToken = session.data.session?.provider_token;

                axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems/${externalImageId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + providerToken
                    }
                })
                    .then((response) => {
                        const data = {
                            baseUrl: response.data.baseUrl,
                            imageId: response.data.id
                        }
                        setGooglePhotoMetadata(data)
                    })
            })
    }, []);

    if (googlePhotoMetadata) {
        return (
            <Image
                loader={googlePhotosPathLoader}
                src={googlePhotoMetadata.baseUrl}
                width={350}
                height={400}
                // TODO: dynamically apply size based on what page is being rendered. I think this is somehow happening on its own. Needs to look into it.
                // width={200}
                // height={250}
                alt="clothing article image"
                className="border border-neutral-200 border-2"
            />
        )
    }
}

export default ArticleImage;