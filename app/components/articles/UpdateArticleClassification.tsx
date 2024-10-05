'use client'
import Image from "next/image";
import { Article } from "@/types/article";
import { useState } from "react";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import ArticleClassification from "@/app/components/articles/ArticleClassification";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { updateArticleCategories } from "@/app/server-actions/article/updateArticleCategories";
import SuccessModal from "@/app/components/modal/SuccessModal";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface UpdateArticleClassificationProps {
    article: Article;
}

const UpdateArticleClassification = ({ article }: UpdateArticleClassificationProps) => {
    const [editingArticle, setEditingArticle] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum>(article.articleCategory);
    const [selectedWeatherCategory, setSelectedWeatherCategory] = useState<WeatherCategoryEnum>(article.weatherCategory);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<boolean>();

    const updateErrorMessage = "An error occurred when updating your article. Please try again."

    const handleSubmit = () => {
        updateArticleCategories(article, selectedCategory, selectedWeatherCategory)
            .then(() => {
                setEditingArticle(false)
                setShowConfirmation(true)
            })
            .then(() => setTimeout(() => setShowConfirmation(false), 2000))
            .catch(() => {
                setUpdateError(true)
            })
    }

    return (
        <>
            <div
                onClick={() => setEditingArticle(true)}
                className="w-[40px] h-[40px] self-end mr-[10px] mb-4"
            >
                <Image
                    src="/edit-category.svg"
                    height={40}
                    width={40}
                    alt="edit article categories"
                    className="w-full"
                />
            </div>

            {editingArticle && (
                <Modal setIsOpen={setEditingArticle}>
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
                </Modal>
            )}

            {showConfirmation && (
                <SuccessModal setIsOpen={setShowConfirmation} />
            )}

            {updateError && (
                <ErrorModal setIsOpen={setUpdateError} errorMessage={updateErrorMessage} />
            )}
        </>
    )
}

export default UpdateArticleClassification;