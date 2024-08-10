'use client'
import axios, {AxiosResponse} from "axios";
import { refreshGoogleProviderTokenIfNeededWithRetry } from "@/utils/refreshGoogleProviderTokenIfNeeded";
import { GooglePhotoMetadata, PaginatedMediaItems } from "@/types/googlePhotoMetadata";

export const getPaginatedMediaItemsWithRetry = async (pageToken?: string) => {
    let attemptCounter = 0;
    return await getPaginatedMediaItems(attemptCounter, pageToken);
}

const getPaginatedMediaItems = (attemptCounter: number, pageToken?: string): Promise<PaginatedMediaItems> => {
    attemptCounter++

    return refreshGoogleProviderTokenIfNeededWithRetry()
        .then((providerToken: string | undefined) => {
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
                    .then((response: AxiosResponse<any>) => {
                        const data: GooglePhotoMetadata[] = response.data.mediaItems.map((item: any) => {
                            return {
                                baseUrl: item.baseUrl,
                                imageId: item.id
                            }
                        })

                        return {
                            data: data,
                            nextPageToken: response.data.nextPageToken
                        } as PaginatedMediaItems
                    })
                    .catch((error) => {
                        if (attemptCounter > 1) throw error
                        return getPaginatedMediaItems(attemptCounter, pageToken)
                    })
            } else {
                console.log(`couldn't get provider token`)
                throw new Error;
            }
        })
}