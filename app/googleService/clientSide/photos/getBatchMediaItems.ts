'use client'
import axios from "axios";
import { Article } from "@/types/article";
import { refreshGoogleProviderTokenIfNeeded } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { splitArticlesIntoBatches } from "@/app/googleService/clientSide/photos/utils/splitArticlesIntoBatches";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import { buildParams } from "@/app/googleService/clientSide/photos/utils/buildParams";

export const getBatchMediaItems = (articles: Article[]): Promise<GooglePhotoMetadata[]> => {
    return refreshGoogleProviderTokenIfNeeded()
        .then((providerToken) => {
            const articleBatches = splitArticlesIntoBatches(articles);

            const wtf = articleBatches.map((batch) => {
                batchGetMediaItems(providerToken, batch)
                    .then((response) => response)
            }).flat()

            console.log(wtf)
            return wtf
        })
}

const batchGetMediaItems = (providerToken: string, articles: Article[]): Promise<GooglePhotoMetadata[]> => {
    const params = buildParams(articles);

    return axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems:batchGet`, {
        params: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + providerToken
        }
    })
        .then((response) => {
                return response.data.mediaItemResults.map((result) => mediaItemToGooglePhotoMetadata(result))
            }
        )
}