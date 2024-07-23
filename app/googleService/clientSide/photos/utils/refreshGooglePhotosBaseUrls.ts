import { Article } from "@/types/article";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";

export const refreshGooglePhotosBaseUrls = (
    articles: Article[],
    refreshedGooglePhotoMetadata: GooglePhotoMetadata[]
): Article[] => {
    return articles.map((article) => {
        const match = refreshedGooglePhotoMetadata
            .find((photo) => photo.imageId === article.image.imageId)

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