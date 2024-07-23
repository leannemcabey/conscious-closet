'use client'
import { refreshGoogleProviderTokenIfNeeded } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import axios from "axios";
import { Article } from "@/types/article";
import {GooglePhotoMetadata} from "@/types/googlePhotoMetadata";

export const getMediaItem = (article: Article): Promise<GooglePhotoMetadata> => {
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
                        return {
                            baseUrl: response.data.baseUrl,
                            imageId: response.data.id
                        }
                    })
                    .catch(() => {
                        return { imageId: article.image.imageId, baseUrl: "" }
                    })
            }
        })
}