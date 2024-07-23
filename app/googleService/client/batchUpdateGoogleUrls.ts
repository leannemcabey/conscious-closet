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
        const result = await getBatchMediaItems(batch)
        refreshedArticles = [...refreshedArticles, ...refreshGooglePhotosBaseUrls(batch, result)];
    }

    return orderByNewestCreated(refreshedArticles);
}

const getBatchMediaItems = (articles: Article[]): Promise<GooglePhotoMetadata[]> => {
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
                        return response.data.mediaItemResults.map((result) => mediaItemToGooglePhotoMetadata(result))
                    }
                )
        })
}