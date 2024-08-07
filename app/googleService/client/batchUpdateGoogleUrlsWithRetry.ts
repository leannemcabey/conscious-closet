'use client'
import axios from "axios";
import { buildParams } from "@/app/googleService/utils/buildParams";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import { Article } from "@/types/article";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { splitArticlesIntoBatches } from "@/app/googleService/utils/splitArticlesIntoBatches";
import { refreshGooglePhotosBaseUrls } from "@/app/googleService/utils/refreshGooglePhotosBaseUrls";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";

export const batchUpdateGoogleUrlsWithRetry = async (articles: Article[]): Promise<Article[]> => {
    const articleBatches = splitArticlesIntoBatches(articles);

    let refreshedArticles: Article[] = [];

    for (const batch of articleBatches) {
        let attemptCounter = 0;
        let result;

        try {
            result = await getBatchMediaItems(batch, attemptCounter)
        } catch(error) {
            throw error
        }

        refreshedArticles = [...refreshedArticles, ...refreshGooglePhotosBaseUrls(batch, result)];
    }

    return orderByNewestCreated(refreshedArticles);
}

const getBatchMediaItems = (articles: Article[], attemptCounter: number): Promise<GooglePhotoMetadata[]> => {
    attemptCounter++

    return refreshGoogleProviderTokenIfNeededWithRetry()
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
                    return mappedResults.filter((result) => result !== undefined)
                })
                .catch((error) => {
                    if (attemptCounter > 1) throw error;
                    getBatchMediaItems(articles, attemptCounter);
                })
        })
}