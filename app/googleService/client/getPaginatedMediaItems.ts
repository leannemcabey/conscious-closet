'use client'
import axios from "axios";
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import { PaginatedMediaItems } from "@/types/googlePhotoMetadata";

export async function getPaginatedMediaItemsWithRetry(pageToken: string) {
    let attemptCounter = 0;
    return getPaginatedMediaItems(pageToken, attemptCounter);
}

const getPaginatedMediaItems = (pageToken: string, attemptCounter: number): Promise<PaginatedMediaItems> => {
    attemptCounter++

    return refreshGoogleProviderTokenIfNeededWithRetry()
        .then((providerToken) => {
            if (providerToken) {
                return axios.get("https://photoslibrary.googleapis.com/v1/mediaItems", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + providerToken
                    },
                    params: {
                        pageSize: "16",
                        pageToken: pageToken
                    }
                })
                    .then((response) => {
                        const data = response.data.mediaItems.map((item: any) => {
                            return {
                                baseUrl: item.baseUrl,
                                imageId: item.id
                            }
                        })

                        return {
                            data: data,
                            nextPageToken: response.data.nextPageToken
                        }
                    })
                    .catch((error) => {
                        if (attemptCounter > 1) throw error
                        getPaginatedMediaItems(pageToken, attemptCounter)
                    })
            }
        })
}