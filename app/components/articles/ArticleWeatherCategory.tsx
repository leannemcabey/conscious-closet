'use client'
import { Article } from "@/types/Article";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { useState } from "react";
import { Weather } from "@/app/components/articles/new/Weather";
import { updateArticleWeatherCategory } from "@/app/server-actions/article/updateArticleWeatherCategory";

interface ArticleWeatherCategory {
    article: Article;
}

const ArticleWeatherCategory = ({ article }: ArticleWeatherCategory) => {
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategory>(article.weatherCategory);

    const handleClick = (category: WeatherCategory) => {
        setWeatherCategory(category)
        if (category !== article.weatherCategory) {
            updateArticleWeatherCategory(article, category)
        }
    }

    return (
        <div className="flex w-80 mt-2 py-4 px-8 justify-center self-center text-xl bg-white rounded-md">
            <div className="w-3/4 flex place-content-between">
                <div onClick={() => handleClick(WeatherCategory.WARM)}>
                    <Weather
                        weatherCategory={WeatherCategory.WARM}
                        isSelected={weatherCategory === WeatherCategory.WARM}
                        iconPath="/warm-weather-icon.svg"
                        size="large"
                    />
                </div>

                <div onClick={() => handleClick(WeatherCategory.MIXED)}>
                    <Weather
                        weatherCategory={WeatherCategory.MIXED}
                        isSelected={weatherCategory === WeatherCategory.MIXED}
                        iconPath="/mixed-weather-icon.svg"
                        size="large"
                    />
                </div>

                <div onClick={() => handleClick(WeatherCategory.COLD)}>
                    <Weather
                        weatherCategory={WeatherCategory.COLD}
                        isSelected={weatherCategory === WeatherCategory.COLD}
                        iconPath="/cold-weather-icon.svg"
                        size="large"
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticleWeatherCategory;