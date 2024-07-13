'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { NewArticleImage } from "@/app/components/articles/new/NewArticleImage";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { createArticle } from "@/app/server-actions/article/createArticle";
import Image from "next/image";
import ArticleCreationErrorAlertModal from "@/app/components/articles/new/ArticleCreationErrorAlertModal";
import { Article } from "@/types/article";

interface NewArticleContainerProps {
    category: ArticleCategoryEnum
    setAddingArticle: Dispatch<SetStateAction<boolean>>;
    unfilteredArticles: Article[];
    setUnfilteredArticles: Dispatch<SetStateAction<Article[]>>;
}

const NewArticleContainer = ({ category, setAddingArticle, unfilteredArticles, setUnfilteredArticles }: NewArticleContainerProps) => {
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined);
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategoryEnum | undefined>(undefined);
    const [creationError, setCreationError] = useState<boolean>();
    const [submitted, setSubmitted] = useState<boolean>();

    const buttonDisabled: boolean = weatherCategory === undefined
    const buttonImage = buttonDisabled ? "/disabled-check-mark-button.svg" : "/check-mark-button.svg"

    const celebrationGif = <Image unoptimized={true} src="/celebration.gif" alt="celebration gif" height="320" width="320"/>

    if (!image) return <ImageSelection setImage={setImage}/>

    const handleSubmit = () => {
        createArticle({
            image: image,
            articleCategory: category,
            weatherCategory: weatherCategory!!
        })
            .then((newArticle) => {
                const copy = [...unfilteredArticles]
                copy.unshift(newArticle)
                setUnfilteredArticles(copy)
            })
            .then(() => setSubmitted(true))
            // The setTimeout is to give the celebration gif time to display before automatically closing the modal
            .then(() => setTimeout(() => setAddingArticle(false), 750))
            .catch(() => {setCreationError(true)})
    }

    return (
        <>
            {creationError && <ArticleCreationErrorAlertModal setIsOpen={setCreationError} />}
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
                                className="mt-2 self-end rounded-full"
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