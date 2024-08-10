'use client'
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import axios, {AxiosResponse} from "axios";
import { Article } from "@/types/article";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import {GooglePhotoMetadata} from "@/types/googlePhotoMetadata";

export async function updateGoogleUrlWithRetry(article: Article) {
    let attemptCounter = 0;
    return await updateGoogleUrl(article, attemptCounter);
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
                    .then((response: AxiosResponse<any>) => {
                        const googleMetaData: GooglePhotoMetadata | undefined = mediaItemToGooglePhotoMetadata({ mediaItem: response.data })
                        return { ...article, image: { ...googleMetaData } } as Article;
                    })
                    .catch((error) => {
                        if (attemptCounter > 1) throw error;
                        return updateGoogleUrl(article, attemptCounter)
                    })
            } else {
                console.log(`couldn't get provider token`)
                throw new Error;
            }
        })
}