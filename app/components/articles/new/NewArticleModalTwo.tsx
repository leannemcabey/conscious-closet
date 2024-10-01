'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import Modal from "@/app/components/modal/Modal";
import ArticleClassification from "@/app/components/articles/new/ArticleClassification";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { createArticle } from "@/app/server-actions/article/createArticle";
import { Article } from "@/types/article";
import Image from "next/image";
import * as React from "react";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface NewArticleModalTwoProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    unfilteredArticles?: Article[];
    setUnfilteredArticles?: Dispatch<SetStateAction<Article[]>>;
    category?: ArticleCategoryEnum;
    weatherCategory?: WeatherCategoryEnum;
}

const NewArticleModalTwo = ({ setIsOpen, unfilteredArticles, setUnfilteredArticles, category, weatherCategory }: NewArticleModalTwoProps) => {
    const [step, setStep] = useState<number>(1);
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum | undefined>(category);
    const [selectedWeatherCategory, setSelectedWeatherCategory] = useState<WeatherCategoryEnum | undefined>(weatherCategory);
    const [creationError, setCreationError] = useState<boolean>();

    const errorMessage = "An error occurred when trying to add this article. It may be that you already have it in your closet."

    const handleSubmit = () => {
        createArticle({
            image: image!,
            articleCategory: selectedCategory!,
            weatherCategory: selectedWeatherCategory!
        })
            .then((newArticle) => {
                // When adding articles from a category page, these will be passed to the component
                // and require updating so the new article is reflected
                if (unfilteredArticles && setUnfilteredArticles) {
                    const copy = [...unfilteredArticles]
                    copy.unshift(newArticle)
                    setUnfilteredArticles(copy)
                }
            })
            .then(() => setStep(3))
            // The setTimeout is to give the success gif time to display before automatically closing the modal
            .then(() => setTimeout(() => setIsOpen(false), 2000))
            .catch(() => {
                setCreationError(true)
            })
    }

    if (creationError) return <ErrorModal setIsOpen={setIsOpen} errorMessage={errorMessage} />

    console.log(`weather: ${weatherCategory}`)
    console.log(`selected weather: ${selectedWeatherCategory}`)

    return (
        <Modal setIsOpen={setIsOpen}>
            <>
                <CloseModalButton setIsOpen={setIsOpen} />

                {step === 1 &&
                    <ImageSelection setImage={setImage} setStep={setStep}/>
                }

                {step === 2 && image &&
                    <ArticleClassification
                        image={image}
                        setStep={setStep}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedWeatherCategory={selectedWeatherCategory}
                        setSelectedWeatherCategory={setSelectedWeatherCategory}
                        handleSubmit={handleSubmit}
                    />
                }

                {step === 3 &&
                    <div className="flex justify-center">
                        <Image unoptimized={true} src="/checkmark.gif" alt="success" height="200" width="200"/>
                    </div>
                }
            </>
        </Modal>
    )
}

export default NewArticleModalTwo;