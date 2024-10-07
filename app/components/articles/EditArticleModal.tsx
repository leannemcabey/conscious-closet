'use client'
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import ArticleClassification from "@/app/components/articles/ArticleClassification";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

interface EditArticleModalProps {
    setEditingArticle: Dispatch<SetStateAction<boolean>>;
    selectedCategory: ArticleCategoryEnum;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum | undefined>>;
    selectedWeatherCategory: WeatherCategoryEnum;
    setSelectedWeatherCategory: Dispatch<SetStateAction<WeatherCategoryEnum | undefined>>;
    handleSubmit: () => void;
}

const EditArticleModal = ({ setEditingArticle, selectedCategory, setSelectedCategory, selectedWeatherCategory, setSelectedWeatherCategory, handleSubmit }: EditArticleModalProps) => {
    return (
        <Modal setIsOpen={setEditingArticle}>
            <>
                <CloseModalButton setIsOpen={setEditingArticle}/>

                <div className="flex flex-col">
                    <ArticleClassification
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedWeatherCategory={selectedWeatherCategory}
                        setSelectedWeatherCategory={setSelectedWeatherCategory}
                    />

                    <button
                        className="pt-4 self-end"
                        onClick={() => handleSubmit()}
                    >
                        <Image
                            src="/check-mark-button-green.svg"
                            height={40}
                            width={40}
                            alt="update article"
                        />
                    </button>
                </div>
            </>
        </Modal>
    )
}

export default EditArticleModal;