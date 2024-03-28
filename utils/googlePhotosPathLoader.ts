import { ImageLoader } from "next/image";

export const googlePhotosPathLoader: ImageLoader = ({src}): string => {
    return `${src}?w=100&q=75`
}