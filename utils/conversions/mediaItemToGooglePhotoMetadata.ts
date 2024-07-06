import { MediaItemResult } from "@/types/GooglePhotoMetadata";

// Takes the format returned from Google and returns the GooglePhotoMetadata type
export const mediaItemToGooglePhotoMetadata = (mediaItemResult: MediaItemResult) => {
    return {
        baseUrl: mediaItemResult.mediaItem.baseUrl,
        imageId: mediaItemResult.mediaItem.id
    }
}