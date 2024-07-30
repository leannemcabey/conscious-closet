'use client'
import { Article } from "@/types/article";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import {useEffect, useRef, useState} from "react";
import { Weather } from "@/app/components/articles/Weather";
import { updateArticleWeatherCategory } from "@/app/server-actions/article/updateArticleWeatherCategory";
import ErrorModal from "@/app/components/modal/ErrorModal";
import {ArticleCategoryEnum, ArticleCategoryTitle} from "@/types/enums/articleCategoryEnum";
import * as React from "react";

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
            <div className="flex w-full justify-end">
                {isOpen && (
                    <div className="flex">
                        {Object.keys(WeatherCategoryEnum).map((category) => {
                            if (category.toLowerCase() !== weatherCategory) {
                                return (
                                    <div
                                        key={category}
                                        onClick={() => handleClick(WeatherCategoryEnum[category])}
                                    >
                                        <Weather
                                            weatherCategory={WeatherCategoryEnum[category]}
                                            isSelected={false}
                                            iconPath={`/weather-icon-${category}.svg`}
                                            size="large"
                                        />
                                    </div>
                                )
                            }
                        })}
                    </div>
                )}

                <div onClick={() => setIsOpen(!isOpen)}>
                    <Weather
                        weatherCategory={weatherCategory}
                        isSelected={true}
                        iconPath={`/weather-icon-${weatherCategory}.svg`}
                        size="large"
                    />
                </div>
            </div>

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default ArticleWeatherCategory;