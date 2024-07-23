import axios from "axios";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { Article } from "@/types/article";
import { mediaItemToGooglePhotoMetadata } from "@/utils/typeConversions/mediaItemToGooglePhotoMetadata";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";

const splitArticlesIntoBatches = (articles: Article[]): [Article[]] => {
    // The maximum number of media items that can be retrieved in one call is 50.
    if (articles.length < 50) return [articles];

    const articleSubsections: [Article[]] = [];

    let startingIndex = 0;
    let endingIndex = 49;

    while (endingIndex < articles.length) {
        articleSubsections.push(articles.slice(startingIndex, endingIndex));
        startingIndex += 50;
        endingIndex += 50;
    }

    return articleSubsections;
}

const buildParams = (articles: Article[]): URLSearchParams => {
    const params = new URLSearchParams();
    articles.forEach((article) => params.append("mediaItemIds", article.image.imageId));
    return params;
};

const batchGetMediaItems = (providerToken: string, articles: Article[]): Promise<GooglePhotoMetadata[]> => {
    const params = buildParams(articles);

    return axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems:batchGet`, {
        params: params,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + providerToken
        }
    })
        .then((response) => {
            return response.data.mediaItemResults.map((result) => mediaItemToGooglePhotoMetadata(result))
        }
    )
}

const replaceWithRefreshedGooglePhotosBaseUrl = (
    articles: Article[],
    refreshedGooglePhotoMetadata: GooglePhotoMetadata[]
): Article[] => {
    return articles.map((article) => {
        const match = refreshedGooglePhotoMetadata.find((photo) => photo.imageId === article.image.imageId)

        if (match) {
            return { ...article, image: { ...match } }
        }

        // This happens when the image has been deleted from the user's Google Photos account.
        // A placeholder image will be used in the Polaroid component.
        if (!match) {
            return { ...article, image: { imageId: article.image.imageId, baseUrl: "" } }
        }
    })
}

export const refreshGooglePhotosBaseUrls = async (providerToken: string, articles: Article[]): Promise<Article[]> => {
    const articleBatches = splitArticlesIntoBatches(articles);
    let refreshedArticles: Article[] = [];

    for (const batch of articleBatches) {
        const result = await batchGetMediaItems(providerToken, batch)
        refreshedArticles = [...refreshedArticles, ...replaceWithRefreshedGooglePhotosBaseUrl(batch, result)];
    }

    return orderByNewestCreated(refreshedArticles);
}