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

export const batchUpdateGoogleUrlsWithRetry = (articles: Article[]): Article[] => {
    const providerToken = refreshGoogleProviderTokenIfNeededWithRetry();

    const articleBatches = splitArticlesIntoBatches(articles);
    let refreshedArticles: Article[] = [];

    articleBatches.forEach((batch) => {
        let attemptCounter = 0;

        try {
            getBatchMediaItems(batch, providerToken, attemptCounter)
                .then((result) => {
                    refreshedArticles = [...refreshedArticles, ...refreshGooglePhotosBaseUrls(batch, result)];
                })
        } catch(error) {
            throw error
        }
    })

    return orderByNewestCreated(refreshedArticles);
}

const getBatchMediaItems = (articles: Article[], providerToken: string, attemptCounter: number): Promise<GooglePhotoMetadata[]> => {
    attemptCounter++

    const params = buildParams(articles);

    console.log(`making batch call with token: ${providerToken}`)
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
            getBatchMediaItems(articles, providerToken, attemptCounter);
        })
}