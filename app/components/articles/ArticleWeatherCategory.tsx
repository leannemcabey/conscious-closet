'use client'
import { Article } from "@/types/article";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { useState } from "react";
import { Weather } from "@/app/components/articles/Weather";
import { updateArticleWeatherCategory } from "@/app/server-actions/article/updateArticleWeatherCategory";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface ArticleWeatherCategoryProps {
    article: Article;
}

const ArticleWeatherCategory = ({ article }: ArticleWeatherCategoryProps) => {
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategoryEnum>(article.weatherCategory);
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred while changing the weather category for this article. Please try again."

    const handleClick = (category: WeatherCategoryEnum) => {
        if (category !== article.weatherCategory) {
            updateArticleWeatherCategory(article, category)
                .then(() => setWeatherCategory(category))
                .catch(() => setError(true))
        }
    }

    return (
        <>
            <div className="flex self-center space-x-1 max-w-[50%]">
                    <div onClick={() => handleClick(WeatherCategoryEnum.WARM)}>
                        <Weather
                            weatherCategory={WeatherCategoryEnum.WARM}
                            isSelected={weatherCategory === WeatherCategoryEnum.WARM}
                            iconPath="/warm-weather-icon.svg"
                            size="large"
                        />
                    </div>

                    <div onClick={() => handleClick(WeatherCategoryEnum.MIXED)}>
                        <Weather
                            weatherCategory={WeatherCategoryEnum.MIXED}
                            isSelected={weatherCategory === WeatherCategoryEnum.MIXED}
                            iconPath="/mixed-weather-icon.svg"
                            size="large"
                        />
                    </div>

                    <div onClick={() => handleClick(WeatherCategoryEnum.COLD)}>
                        <Weather
                            weatherCategory={WeatherCategoryEnum.COLD}
                            isSelected={weatherCategory === WeatherCategoryEnum.COLD}
                            iconPath="/cold-weather-icon.svg"
                            size="large"
                        />
                    </div>
            </div>

            {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}
        </>
    )
}

export default ArticleWeatherCategory;