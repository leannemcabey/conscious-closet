'use client'
import {Dispatch, ReactElement, SetStateAction, useState} from "react";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { NewArticleImage } from "@/app/components/articles/new/NewArticleImage";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import BackButton from "@/app/components/navigation/BackButton";
import { createArticle } from "@/app/server-actions/article/createArticle";
import Image from "next/image";

interface NewArticleContainerProps {
    category: ArticleCategory
    setAddingArticle: Dispatch<SetStateAction<boolean>>;
}

const NewArticleContainer = ({ category, setAddingArticle }: NewArticleContainerProps) => {
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined);
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategory | undefined>(undefined);
    const [submitted, setSubmitted] = useState<boolean>();

    const buttonDisabled: boolean = weatherCategory === undefined
    const buttonImage = buttonDisabled ? "/disabled-check-mark-button.svg" : "/check-mark-button.svg"

    const celebrationGif = <Image src="/celebration.gif" alt="celebration gif" height="320" width="320"/>

    if (!image) return <ImageSelection setImage={setImage}/>

    const handleSubmit = () => {
        createArticle({
            image: image,
            articleCategory: category,
            weatherCategory: weatherCategory!!
        })
            .then(() => setSubmitted(true))
            .then(() => setTimeout(() => setAddingArticle(false), 750))
    }

    return (
        <>
            {submitted && celebrationGif}

            {!submitted && (
                <div className="flex flex-col mt-4">
                    <div className="text-center justify-center">
                        <NewArticleImage baseUrl={image.baseUrl}/>
                        <WeatherPicker weatherCategory={weatherCategory} setWeatherCategory={setWeatherCategory}/>
                    </div>

                    {image &&
                        <button disabled={buttonDisabled}
                                onClick={() => handleSubmit()}
                                className="mt-2 self-end"
                        >
                            <Image src={buttonImage} height="32" width="32" alt="check mark icon"/>
                        </button>
                    }
                </div>
            )}
        </>
    );
}

export default NewArticleContainer;