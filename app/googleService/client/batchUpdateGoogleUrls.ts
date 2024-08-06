'use client'
import axios from "axios";
import { buildParams } from "@/app/googleService/utils/buildParams";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import { Article } from "@/types/article";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { splitArticlesIntoBatches } from "@/app/googleService/utils/splitArticlesIntoBatches";
import { refreshGooglePhotosBaseUrls } from "@/app/googleService/utils/refreshGooglePhotosBaseUrls";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";
import { refreshGoogleProviderTokenIfNeeded } from "@/utils/refreshGoogleProviderTokenIfNeeded";

export const batchUpdateGoogleUrls = async (articles: Article[]): Promise<Article[]> => {
    const articleBatches = splitArticlesIntoBatches(articles);

    let refreshedArticles: Article[] = [];

    for (const batch of articleBatches) {
        let result;

        try {
            result = await getBatchMediaItems(batch)
            console.log(`batch media items: ${result.length}`)
        } catch(error) {
            throw error
        }

        refreshedArticles = [...refreshedArticles, ...refreshGooglePhotosBaseUrls(batch, result)];
    }

    return orderByNewestCreated(refreshedArticles);
}


let attemptCounter = 0;

const getBatchMediaItems = (articles: Article[]): Promise<GooglePhotoMetadata[]> => {
    attemptCounter++

    return refreshGoogleProviderTokenIfNeeded()
        .then((providerToken) => {
            const params = buildParams(articles);

            return axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems:batchGet`, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + providerToken
                }
            })
                .then((response) => {
                    const mappedResults = response.data.mediaItemResults.map((result) => mediaItemToGooglePhotoMetadata(result))
                    console.log(`mappedResults: ${mappedResults.length}`)
                    console.log(`filtered undefined out: ${mappedResults.filter((result) => result !== undefined).length}`)
                    return mappedResults.filter((result) => result !== undefined)
                })
                .catch((error) => {
                    if (attemptCounter > 2) throw error;
                    getBatchMediaItems(articles)
                })
        })
}