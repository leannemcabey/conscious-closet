'use client'
import { Article } from "@/types/article";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { useState } from "react";
import { Weather } from "@/app/components/articles/Weather";
import { updateArticleWeatherCategory } from "@/app/server-actions/article/updateArticleWeatherCategory";

interface ArticleWeatherCategory {
    article: Article;
}

const ArticleWeatherCategory = ({ article }: ArticleWeatherCategory) => {
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategoryEnum>(article.weatherCategory);

    const handleClick = (category: WeatherCategoryEnum) => {
        setWeatherCategory(category)
        if (category !== article.weatherCategory) {
            updateArticleWeatherCategory(article, category)
        }
    }

    return (
        <div className="flex self-center space-x-2">
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
    )
}

export default ArticleWeatherCategory;