'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import axios from "axios";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import Polaroid from "@/app/components/articles/Polaroid";
import LastWorn from "@/app/components/articles/LastWorn";
import ArticleWeatherCategory from "@/app/components/articles/ArticleWeatherCategory";
import { Article } from "@/types/article";
import Image from "next/image";

interface ArticleImageProps {
    article: Article
}

const ArticleImage = ({ article }: ArticleImageProps) => {
    const supabase = createClient();
    const [googlePhotoMetadata, setGooglePhotoMetadata] = useState<GooglePhotoMetadata>();

    useEffect(() => {
        supabase.auth.getSession()
            .then((session) => {
                const providerToken = session.data.session?.provider_token;

                axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems/${article.image.imageId}`, {
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

    if (!googlePhotoMetadata) return (
        <div className="flex justify-center h-[583px]">
            <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin" />
        </div>
    )

    if (googlePhotoMetadata) return (
        <div className="h-[583px]">
            <Polaroid imageUrl={googlePhotoMetadata.baseUrl} size="large">
                <LastWorn article={article}/>
                <ArticleWeatherCategory article={article} />
            </Polaroid>
        </div>
        )

}

export default ArticleImage;