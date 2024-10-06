'use client'
import { useState } from "react";
import IconButton from "@/app/components/buttons/IconButton";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import SuccessModal from "@/app/components/modal/SuccessModal";
import ErrorModal from "@/app/components/modal/ErrorModal";
import { updateArticleCategories } from "@/app/server-actions/article/updateArticleCategories";
import { Article } from "@/types/article";
import EditArticleModal from "@/app/components/articles/EditArticleModal";

interface EditArticleButtonProps {
    article: Article;
}

const EditArticleButton = ({ article }: EditArticleButtonProps) => {
    const [editingArticle, setEditingArticle] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum>(article.articleCategory);
    const [selectedWeatherCategory, setSelectedWeatherCategory] = useState<WeatherCategoryEnum>(article.weatherCategory);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<boolean>(false);

    const updateErrorMessage = "An error occurred when updating your article. Please try again."

    const handleSubmit = () => {
        updateArticleCategories(article, selectedCategory!!, selectedWeatherCategory!!)
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
            <IconButton
                handleClick={() => setEditingArticle(true)}
                isActive={true}
                iconPath="/pen-white.svg"
                iconAlt="edit icon"
            />

            {editingArticle && (
                <EditArticleModal
                    setEditingArticle={setEditingArticle}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedWeatherCategory={selectedWeatherCategory}
                    setSelectedWeatherCategory={setSelectedWeatherCategory}
                    handleSubmit={handleSubmit}
                />
            )}

            {showConfirmation && <SuccessModal setIsOpen={setShowConfirmation} />}

            {updateError && <ErrorModal setIsOpen={setUpdateError} errorMessage={updateErrorMessage} />}
        </>
    )
}

export default EditArticleButton;