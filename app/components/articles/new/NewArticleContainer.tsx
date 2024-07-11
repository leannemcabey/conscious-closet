'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { NewArticleImage } from "@/app/components/articles/new/NewArticleImage";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import { createArticle } from "@/app/server-actions/article/createArticle";
import Image from "next/image";
import ArticleCreationErrorAlertModal from "@/app/components/articles/new/ArticleCreationErrorAlertModal";
import {Article} from "@/types/Article";
import {getAllArticlesInCategory} from "@/app/server-actions/article/getAllArticlesInCategory";
import {getSuitcases} from "@/app/server-actions/suitcase/getSuitcases";
import {toSuitcase} from "@/utils/conversions/toSuitcase";
import {orderByNewestCreated} from "@/utils/orderByNewestCreated";
import {toArticle} from "@/utils/conversions/toArticle";
import {redirect} from "next/navigation";

interface NewArticleContainerProps {
    category: ArticleCategory
    setAddingArticle: Dispatch<SetStateAction<boolean>>;
    setUnfilteredArticles: Dispatch<SetStateAction<Article[]>>;
}

const NewArticleContainer = ({ category, setAddingArticle, setUnfilteredArticles }: NewArticleContainerProps) => {
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined);
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategory | undefined>(undefined);
    const [submitted, setSubmitted] = useState<boolean>();
    const [error, setError] = useState<boolean>();

    const buttonDisabled: boolean = weatherCategory === undefined
    const buttonImage = buttonDisabled ? "/disabled-check-mark-button.svg" : "/check-mark-button.svg"

    const celebrationGif = <Image unoptimized={true} src="/celebration.gif" alt="celebration gif" height="320" width="320"/>

    if (!image) return <ImageSelection setImage={setImage}/>

    const fetchAndResetArticles = () => {
        getAllArticlesInCategory(category)
            .then((data) => {
                const mapped = data?.map((article) => toArticle(article))
                const sorted = orderByNewestCreated(mapped as any[])
                setUnfilteredArticles(sorted)
            })
    }


    const handleSubmit = () => {
        createArticle({
            image: image,
            articleCategory: category,
            weatherCategory: weatherCategory!!
        })
            .then(() => fetchAndResetArticles())
            .then(() => setSubmitted(true))
            // The setTimeout is to give the celebration gif time to display before automatically closing the modal
            .then(() => setTimeout(() => setAddingArticle(false), 750))
            .catch(() => setError(true))
    }

    return (
        <>
            {error && <ArticleCreationErrorAlertModal setIsOpen={setError} unsetImage={setImage}/>}
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