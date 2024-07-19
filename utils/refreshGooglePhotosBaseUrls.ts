'use client'
import axios from "axios";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { Article } from "@/types/article";
import { createClient } from "@/utils/supabase/client";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";

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

            // TODO The maximum number of media items that can be retrieved in one call is 50.
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
                    setRefreshedArticlesState(orderByNewestCreated(refreshed))
                })
        })
}