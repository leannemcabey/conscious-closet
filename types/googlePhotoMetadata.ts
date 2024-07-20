export interface GooglePhotoMetadata {
    baseUrl: string;
    imageId: string;
}

// Represents the data coming back from the Google Photos API
export interface MediaItemResult {
    mediaItem: {
        baseUrl: string;
        id: string;
    }
}

export interface MediaItemErrorResult {
    status: {
        code: number,
        message: string
    }
}

export interface MediaItemBatchResult {
    data: {
        mediaItemResults: MediaItemResult[]
    }
}