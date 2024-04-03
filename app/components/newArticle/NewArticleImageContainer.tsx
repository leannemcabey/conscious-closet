'use client'
import { useState } from "react";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import { ImageSelection } from "@/app/components/newArticle/ImageSelection";

export const NewArticleImageContainer = () => {
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined);

    if (image) {
        // return <NewArticleImage baseUrl={image.baseUrl} />
        return <p>{image.baseUrl}</p>
    }

    return <ImageSelection setImage={setImage}/>
}