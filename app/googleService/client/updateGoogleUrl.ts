'use client'
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import axios, { AxiosResponse } from "axios";
import { Article } from "@/types/article";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {createClient} from "@/utils/supabase/client";

export async function updateGoogleUrlWithRetry(article: Article, router: AppRouterInstance) {
    let attemptCounter = 0;
    return await updateGoogleUrl(article, attemptCounter, router);
}

const updateGoogleUrl = (article: Article, attemptCounter: number, router: AppRouterInstance): Promise<Article | void> => {
    const supabase = createClient();
    attemptCounter++

    return refreshGoogleProviderTokenIfNeededWithRetry(router)
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
                        if (attemptCounter > 1) return { ...article, image: { imageId: article.image.imageId, baseUrl: "/missing-article.png" } } as Article;
                        return updateGoogleUrl(article, attemptCounter, router)
                    })
            } else {
                console.log(`couldn't get provider token`)
                return supabase.auth.signOut()
                    .then(() => router.push("/"))
            }
        })
}