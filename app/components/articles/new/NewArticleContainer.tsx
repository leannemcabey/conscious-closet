'use client'
import { useState } from "react";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { NewArticleImage } from "@/app/components/articles/new/NewArticleImage";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { CreateArticleButton } from "@/app/components/articles/new/CreateArticleButton";
import { ArticleCategory, categorySlugToTitleMap } from "@/types/enums/ArticleCategory";

interface NewArticleContainerProps {
    category: ArticleCategory
}

const NewArticleContainer = ({ category }: NewArticleContainerProps) => {
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined);
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategory | undefined>(undefined);

    if (!image) return <ImageSelection setImage={setImage}/>

    return (
        <div className="text-center justify-center mt-4 text-2xl">
            <h1>{categorySlugToTitleMap[category]}</h1>
            <NewArticleImage baseUrl={image.baseUrl}/>
            <WeatherPicker weatherCategory={weatherCategory} setWeatherCategory={setWeatherCategory}/>

            {image && weatherCategory &&
                <CreateArticleButton newArticleInput={{
                    image: image,
                    articleCategory: category,
                    weatherCategory: weatherCategory
                }} />
            }
        </div>
    )
}

export default NewArticleContainer;