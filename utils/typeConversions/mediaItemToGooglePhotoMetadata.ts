import { GooglePhotoMetadata, MediaItemErrorResult, MediaItemResult } from "@/types/googlePhotoMetadata";

// Takes the format returned from Google and returns the GooglePhotoMetadata type
export const mediaItemToGooglePhotoMetadata = (mediaItemResult: MediaItemResult | MediaItemErrorResult): GooglePhotoMetadata => {
    if ("mediaItem" in mediaItemResult && mediaItemResult.mediaItem) {
        return {
            baseUrl: mediaItemResult.mediaItem.baseUrl,
            imageId: mediaItemResult.mediaItem.id
        }
    }

    // This happens when the image has been deleted from the user's Google Photos account.
    // In order to work with this missing image throughout the rest of the pipeline, we have to use these empty
    // placeholder strings. A placeholder image will be used in the Polaroid component.
    if ("status" in mediaItemResult && mediaItemResult.status) {
        return {
            baseUrl: "",
            imageId: ""
        }
    }
}