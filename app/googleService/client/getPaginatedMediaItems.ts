'use client'
import axios from "axios";
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import { PaginatedMediaItems } from "@/types/googlePhotoMetadata";

export const getPaginatedMediaItemsWithRetry = async (pageToken?: string) => {
    let attemptCounter = 0;
    return await getPaginatedMediaItems(attemptCounter, pageToken);
}

const getPaginatedMediaItems = (attemptCounter: number, pageToken?: string,): Promise<PaginatedMediaItems> => {
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
                        getPaginatedMediaItems(attemptCounter, pageToken)
                    })
            }
        })
}