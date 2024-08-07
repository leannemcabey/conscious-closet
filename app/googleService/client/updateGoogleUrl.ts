'use client'
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import axios from "axios";
import { Article } from "@/types/article";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";

export async function updateGoogleUrlWithRetry(article: Article) {
    let attemptCounter = 0;
    return updateGoogleUrl(article, attemptCounter);
}

const updateGoogleUrl = (article: Article, attemptCounter: number): Promise<Article> => {
    attemptCounter++

    return refreshGoogleProviderTokenIfNeededWithRetry()
        .then((providerToken) => {
            if (providerToken) {
                return axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems/${article.image.imageId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + providerToken
                    }
                })
                    .then((response) => {
                        const googleMetaData = mediaItemToGooglePhotoMetadata({ mediaItem: response.data })
                        return { ...article, image: { ...googleMetaData } }
                    })
                    .catch((error) => {
                        if (attemptCounter > 1) throw error;
                        updateGoogleUrl(article, attemptCounter)
                    })
            }
        })
}