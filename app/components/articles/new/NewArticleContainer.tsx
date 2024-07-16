'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { createArticle } from "@/app/server-actions/article/createArticle";
import Image from "next/image";
import { Article } from "@/types/article";
import Polaroid from "@/app/components/articles/Polaroid";
import ErrorModal from "@/app/components/modal/ErrorModal";

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

    const successGif = <Image unoptimized={true} src="/check-green-black.gif" alt="success" height="200" width="200"/>
    const errorMessage = "An error occurred when trying to add this article. It may be that you already have it in your closet."

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
            .then(() => setTimeout(() => setAddingArticle(false), 2000))
            .catch(() => {setCreationError(true)})
    }

    return (
        <>
            {creationError && <ErrorModal setIsOpen={setCreationError} errorMessage={errorMessage} />}
            {submitted &&
                <div className="flex justify-center mt-10">
                    {successGif}
                </div>
            }

            {!submitted && (
                <div className="flex flex-col">
                    <div className="flex justify-center space-x-4">
                        <Polaroid imageUrl={image.baseUrl} size="medium" />
                        <WeatherPicker weatherCategory={weatherCategory} setWeatherCategory={setWeatherCategory}/>
                    </div>

                    {image &&
                        <button disabled={buttonDisabled}
                                onClick={() => handleSubmit()}
                                className="mt-2.5 self-end rounded-full"
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