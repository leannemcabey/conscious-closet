'use client'
import { refreshGoogleProviderTokenIfNeeded } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import axios from "axios";
import { Article } from "@/types/article";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";

export const updateGoogleUrl = (article: Article): Promise<Article> => {
    return refreshGoogleProviderTokenIfNeeded()
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
                    .catch(() => {
                        return { ...article, imageId: article.image.imageId, baseUrl: "" }
                    })
            }
        })
}