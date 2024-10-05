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
import Image from "next/image";

interface ArticleWeatherCategoryProps {
    article: Article;
}

const ArticleWeatherCategory = ({ article }: ArticleWeatherCategoryProps) => {
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategoryEnum>(article.weatherCategory);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred while changing the weather category for this article. Please try again."

    const sizeOverride = "w-[60px] md:w-[50px] lg:w-[50px]";

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
            <div className={`flex w-full justify-end space-x-2 pt-2 pb-2 pl-2 rounded-l-lg drop-shadow ${isOpen && "bg-white"}`}>
                {isOpen && (
                    <div className="flex pl-8 pr-12 animate-enter-from-right">
                        <div className="flex flex-col space-y-2">
                            {Object.keys(WeatherCategoryEnum).map((category) => {
                                // if (category.toLowerCase() !== weatherCategory) {
                                    return (
                                        <IconButton
                                            key={category}
                                            handleClick={() => handleClick(WeatherCategoryEnum[category as keyof typeof WeatherCategoryEnum])}
                                            isActive={true}
                                            iconPath={`/weather-icon-${category.toLowerCase()}.svg`}
                                            iconAlt={`${category}  weather icon}`}
                                            sizeOverride={sizeOverride}
                                            borderOverride={{active: "rounded-lg", inactive: ""}}
                                        />
                                    )
                                // }
                            })}
                        </div>
                        {/*<div className="w-[12px] h-[12px]">*/}
                            <Image
                                src="/arrow-up.svg"
                                width="20"
                                height="20"
                                alt="close"
                                onClick={() => setIsOpen(false)}
                                className="rotate-90"
                            />
                        {/*</div>*/}
                    </div>
                )}

                {!isOpen &&
                    <IconButton
                        handleClick={() => setIsOpen(!isOpen)}
                        isActive={true}
                        iconPath={`/weather-icon-${weatherCategory}.svg`}
                        iconAlt={`${weatherCategory}  weather icon}`}
                        sizeOverride={sizeOverride}
                        // colorOverride={{active: "bg-theme-green", inactive: ""}}
                        borderOverride={{active: "rounded-l-lg drop-shadow-lg", inactive: ""}}
                    />
                }
            </div>

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default ArticleWeatherCategory;