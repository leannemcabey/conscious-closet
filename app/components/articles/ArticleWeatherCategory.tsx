'use client'
import { Article } from "@/types/article";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { useEffect, useState } from "react";
import { Weather } from "@/app/components/articles/Weather";
import { updateArticleWeatherCategory } from "@/app/server-actions/article/updateArticleWeatherCategory";
import ErrorModal from "@/app/components/modal/ErrorModal";
import { ArticleCategoryEnum, ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";
import * as React from "react";
import IconButton from "@/app/components/buttons/IconButton";

interface ArticleWeatherCategoryProps {
    article: Article;
}

const ArticleWeatherCategory = ({ article }: ArticleWeatherCategoryProps) => {
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategoryEnum>(article.weatherCategory);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred while changing the weather category for this article. Please try again."

    const handleClick = (category: WeatherCategoryEnum) => {
        if (category !== weatherCategory) {
            updateArticleWeatherCategory(article, category)
                .then(() => {
                    setWeatherCategory(category)
                    setIsOpen(false)
                })
                .catch(() => setError(true))
        }
    }

    return (
        <>
            <div className="flex w-full justify-end space-x-2">
                {isOpen && (
                    <div className="flex space-x-2">
                        {Object.keys(WeatherCategoryEnum).map((category) => {
                            if (category.toLowerCase() !== weatherCategory) {
                                return (
                                    <IconButton key={category} handleClick={() => handleClick(WeatherCategoryEnum[category])} isActive={false} iconPath={`/weather-icon-${category}.svg`} iconAlt={`${category}  weather icon}`} />
                                )
                            }
                        })}
                    </div>
                )}

                <IconButton handleClick={() => setIsOpen(!isOpen)} isActive={true} iconPath={`/weather-icon-${weatherCategory}.svg`} iconAlt={`${weatherCategory}  weather icon}`} />
            </div>

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default ArticleWeatherCategory;