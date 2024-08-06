import { GooglePhotoMetadata, MediaItemErrorResult, MediaItemResult } from "@/types/googlePhotoMetadata";

// Takes the format returned from Google and returns the GooglePhotoMetadata type
export const mediaItemToGooglePhotoMetadata = (mediaItemResult: MediaItemResult | MediaItemErrorResult): GooglePhotoMetadata | undefined => {
    if ("mediaItem" in mediaItemResult && mediaItemResult.mediaItem) {
        return {
            baseUrl: mediaItemResult.mediaItem.baseUrl,
            imageId: mediaItemResult.mediaItem.id
        }
    } else {
        // This happens when the image has been deleted from the user's Google Photos account.
        return undefined;
    }
}