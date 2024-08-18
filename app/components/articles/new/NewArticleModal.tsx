'use client'
import { Dispatch, SetStateAction, useState } from "react";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import ErrorModal from "@/app/components/modal/ErrorModal";
import Image from "next/image";
import Polaroid from "@/app/components/articles/Polaroid";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ImageSelection } from "@/app/components/articles/new/ImageSelection";
import { createArticle } from "@/app/server-actions/article/createArticle";
import TextButtonFilled from "@/app/components/buttons/TextButtonFilled";

interface NewArticleModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    category: ArticleCategoryEnum;
    unfilteredArticles: Article[];
    setUnfilteredArticles: Dispatch<SetStateAction<Article[]>>;
}

const NewArticleModal = ({ setIsOpen, category, unfilteredArticles, setUnfilteredArticles }: NewArticleModalProps) => {
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined);
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategoryEnum | undefined>(undefined);
    const [creationError, setCreationError] = useState<boolean>();
    const [submitted, setSubmitted] = useState<boolean>();

    const buttonDisabled: boolean = weatherCategory === undefined

    const successGif = <Image unoptimized={true} src="/fireworks.gif" alt="success" height="200" width="200"/>
    const errorMessage = "An error occurred when trying to add this article. It may be that you already have it in your closet."

    const handleSubmit = () => {
        createArticle({
            image: image!,
            articleCategory: category!,
            weatherCategory: weatherCategory!
        })
            .then((newArticle) => {
                const copy = [...unfilteredArticles]
                copy.unshift(newArticle)
                setUnfilteredArticles(copy)
            })
            .then(() => setSubmitted(true))
            // The setTimeout is to give the celebration gif time to display before automatically closing the modal
            .then(() => setTimeout(() => setIsOpen(false), 1000))
            .catch(() => {
                setCreationError(true)
            })
    }

    if (creationError) return <ErrorModal setIsOpen={setIsOpen} errorMessage={errorMessage} />

    return (
        <Modal setIsOpen={setIsOpen}>
            <>
                <CloseModalButton setIsOpen={setIsOpen} />

                {!image && <ImageSelection setImage={setImage}/>}

                {image && !submitted && (
                    <div className="mt-4 flex flex-col place-content-center">
                        <div className="flex flex-col bg-neutral-200 rounded-lg p-2 text-center items-center mb-4 md:mb-8">
                            <div className="flex items-center space-x-1 mb-2.5">
                                <div className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]">
                                    <Image
                                        src="/warning-icon.svg"
                                        height="18"
                                        width="18"
                                        alt="warning"
                                        className="w-full self-center"
                                    />
                                </div>
                                <p className="self-center text-base md:text-2xl">
                                    IMPORTANT:
                                </p>
                            </div>
                            <p className="text-sm md:text-xl">
                                Do not delete this photo from your Google Photos account.
                                If you do, you will no longer be able to access it in Conscious Closet.
                            </p>
                        </div>

                        <div className="flex self-center space-x-2.5">
                            <Polaroid
                                imageUrl={image.baseUrl}
                            />
                            <WeatherPicker weatherCategory={weatherCategory} setWeatherCategory={setWeatherCategory}/>
                        </div>

                        {image &&
                            <div className="self-end mt-6 -mr-2 md:mt-10">
                                <TextButtonFilled handleClick={() => handleSubmit()} disabled={buttonDisabled}>
                                    save
                                </TextButtonFilled>
                            </div>
                        }
                    </div>
                )}

                {submitted &&
                    <div className="flex justify-center mt-6 md:w-[400px] md:h-[400px]">
                        <div className="md:mt-14">
                            {successGif}
                        </div>
                    </div>
                }
            </>
        </Modal>
    )
}

export default NewArticleModal;