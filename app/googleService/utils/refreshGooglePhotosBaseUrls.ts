import { Article } from "@/types/article";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import {markDeletedFromGPhotos} from "@/app/server-actions/article/markDeletedFromGPhotos";

export const refreshGooglePhotosBaseUrls = (
    articles: Article[],
    refreshedGooglePhotoMetadata: GooglePhotoMetadata[]
): Article[] => {
    const refreshed: (Article | undefined)[] = articles.map((article) => {
        const match = refreshedGooglePhotoMetadata.find((photo) => photo.imageId === article.image.imageId)

        if (match) {
            return { ...article, image: { ...match } }
        }

        // This happens when the image has been deleted from the user's Google Photos account.
        // A placeholder image will be used in the Polaroid component.
        if (!match) {
            markDeletedFromGPhotos(article.id)
            return undefined
        }
    })

    return refreshed.filter((article) => article !== undefined) as Article[]
}