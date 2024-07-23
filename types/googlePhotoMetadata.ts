export interface GooglePhotoMetadata {
    baseUrl: string;
    imageId: string;
}

export interface PaginatedMediaItems {
    data: GooglePhotoMetadata[];
    nextPageToken: string
}

export interface MediaItem {
    baseUrl: string;
    id: string;
}

// Represents the data coming back from the Google Photos API
export interface MediaItemResult {
    mediaItem: MediaItem
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

export interface PaginatedMediaItemsResult {
    mediaItems: MediaItem[],
    nextPageToken: string
}