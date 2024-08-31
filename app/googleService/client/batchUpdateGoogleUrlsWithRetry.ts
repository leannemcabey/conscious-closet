'use client'
import axios, {AxiosResponse} from "axios";
import { buildParams } from "@/app/googleService/utils/buildParams";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import { Article } from "@/types/article";
import {GooglePhotoMetadata, MediaItemResult} from "@/types/googlePhotoMetadata";
import { splitArticlesIntoBatches } from "@/app/googleService/utils/splitArticlesIntoBatches";
import { refreshGooglePhotosBaseUrls } from "@/app/googleService/utils/refreshGooglePhotosBaseUrls";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createClient } from "@/utils/supabase/client";

export const batchUpdateGoogleUrlsWithRetry = async (articles: Article[], router: AppRouterInstance): Promise<Article[]> => {
    const articleBatches = splitArticlesIntoBatches(articles);

    let refreshedArticles: Article[] = [];

    for (const batch of articleBatches) {
        let attemptCounter = 0;
        let result;

        try {
            result = await getBatchMediaItems(batch, attemptCounter, router)
        } catch(error) {
            throw error
        }

        if (result) refreshedArticles = [...refreshedArticles, ...refreshGooglePhotosBaseUrls(batch, result)];
    }

    return orderByNewestCreated(refreshedArticles);
}

const getBatchMediaItems = (articles: Article[], attemptCounter: number, router: AppRouterInstance): Promise<GooglePhotoMetadata[] | void> => {
    const supabase = createClient();

    attemptCounter++

    return refreshGoogleProviderTokenIfNeededWithRetry(router)
        .then((providerToken) => {
            if (providerToken) {
                const params = buildParams(articles);

                return axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems:batchGet`, {
                    params: params,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + providerToken
                    }
                })
                    .then((response: AxiosResponse<any>) => {
                        const mappedResults: GooglePhotoMetadata[] = response.data.mediaItemResults.map((result: MediaItemResult) => mediaItemToGooglePhotoMetadata(result))
                        return mappedResults.filter((result: GooglePhotoMetadata | undefined) => result !== undefined) as GooglePhotoMetadata[];
                    })
                    .catch((error) => {
                        if (attemptCounter > 1) throw error;
                        return getBatchMediaItems(articles, attemptCounter, router);
                    })
            } else {
                console.log(`couldn't get provider token`)
                return supabase.auth.signOut()
                    .then(() => router.push("/"))
            }
        })
}