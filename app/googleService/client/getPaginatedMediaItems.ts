'use client'
import axios from "axios";
import { refreshGoogleProviderTokenIfNeeded } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import { PaginatedMediaItems } from "@/types/googlePhotoMetadata";

let attemptCounter = 0;

export const getPaginatedMediaItems = (pageToken: string): Promise<PaginatedMediaItems> => {
    attemptCounter++

    return refreshGoogleProviderTokenIfNeeded()
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
                        getPaginatedMediaItems(pageToken)
                    })
            }
        })
}