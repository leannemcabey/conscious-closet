'use client'
import axios from "axios";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import { Article } from "@/types/Article";
import { createClient } from "@/utils/supabase/client";
import { mediaItemToGooglePhotoMetadata } from "@/utils/conversions/mediaItemToGooglePhotoMetadata";

const buildParams = (articles: Article[]): URLSearchParams => {
    const params = new URLSearchParams();
    articles.forEach((article) => params.append("mediaItemIds", article.image.imageId));
    return params;
};

const replaceWithRefreshedGooglePhotosBaseUrl = (
    articles: Article[],
    refreshedGooglePhotoMetadata: GooglePhotoMetadata[]
): Article[] => {
    return articles.map((article) => {
        const match = refreshedGooglePhotoMetadata.find((photo) => photo.imageId === article.image.imageId)
        return {
            ...article,
            image: { ...match }
        } as Article
    })
}

export const refreshGooglePhotosBaseUrls = (articles: Article[], setRefreshedArticlesState) => {
    const supabase = createClient();

    supabase.auth.getSession()
        .then((session) => {
            const providerToken = session.data.session?.provider_token;
            const params = buildParams(articles);

            axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems:batchGet`, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + providerToken
                }
            })
                .then((response) => {
                    const data: GooglePhotoMetadata[] = response.data.mediaItemResults.map((result) => mediaItemToGooglePhotoMetadata(result))
                    const refreshed = replaceWithRefreshedGooglePhotosBaseUrl(articles, data);
                    console.log(`refreshed: ${JSON.stringify(refreshed)}`)
                    setRefreshedArticlesState(refreshed)
                })
        })
}