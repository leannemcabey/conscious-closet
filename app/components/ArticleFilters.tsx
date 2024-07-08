'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { Weather } from "@/app/components/articles/new/Weather";
import { Article } from "@/types/Article";

interface ArticleFiltersProps {
    articles: Article[];
    filteredArticles: Article[];
    setFilteredArticles: Dispatch<SetStateAction<Article[]>>;
}

const ArticleFilters = ({ articles, filteredArticles, setFilteredArticles }: ArticleFiltersProps) => {
    const [showCleanoutBagItems, setShowCleanoutBagItems] = useState<boolean>(false);
    const [selectedWeatherCategories, setSelectedWeatherCategories] = useState<WeatherCategory[]>([WeatherCategory.COLD, WeatherCategory.MIXED, WeatherCategory.WARM])

    const filterArticles = (cleanoutBagTemporaryValue: boolean, category?: WeatherCategory) => {
        let updatedFilteredArticles: Article[] = articles;

        if (cleanoutBagTemporaryValue) {
            updatedFilteredArticles = articles;
        } else {
            updatedFilteredArticles = articles.filter((article) => !article.inCleanoutBag)
        }

        let categories = []

        if (weatherCategoryIsSelected(category)) {
            categories = selectedWeatherCategories.filter((c) => c !== category)
        } else {
            categories = [...selectedWeatherCategories, category]
        }

        updatedFilteredArticles = updatedFilteredArticles
            .filter((article) => categories.includes(article.weatherCategory))

        // These setState methods don't finish in time for the above to be executed with the correct values
        setShowCleanoutBagItems(!showCleanoutBagItems)
        setSelectedWeatherCategories(categories);
        setFilteredArticles(updatedFilteredArticles);
    }

    const weatherCategoryIsSelected = (category) => selectedWeatherCategories.includes(category)

    const styling = (active: boolean) => active ? "bg-white" : ""

    return (
        <div className="mb-4 px-1 py-2 flex place-content-between border border-theme-blue rounded-md drop-shadow">
            <div
                onClick={() => filterArticles(!showCleanoutBagItems)}
                className={`${styling(showCleanoutBagItems)} px-2 py-1 rounded-full text-sm border border-theme-blue text-theme-blue`}
            >
                show stuff in cleanout bag
            </div>

            <div className="w-1/3 flex place-content-between space-x-2">
                <div
                    onClick={() => filterArticles(showCleanoutBagItems, WeatherCategory.WARM)}>
                    <Weather
                        weatherCategory={WeatherCategory.WARM}
                        isSelected={weatherCategoryIsSelected(WeatherCategory.WARM)}
                        iconPath="/warm-weather-icon.svg"
                        size="small"
                    />
                </div>

                <div onClick={() => filterArticles(showCleanoutBagItems, WeatherCategory.MIXED)}>
                    <Weather
                        weatherCategory={WeatherCategory.MIXED}
                        isSelected={weatherCategoryIsSelected(WeatherCategory.MIXED)}
                        iconPath="/mixed-weather-icon.svg"
                        size="small"
                    />
                </div>

                <div onClick={() => filterArticles(showCleanoutBagItems, WeatherCategory.COLD)}>
                    <Weather
                        weatherCategory={WeatherCategory.COLD}
                        isSelected={weatherCategoryIsSelected(WeatherCategory.COLD)}
                        iconPath="/cold-weather-icon.svg"
                        size="small"
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticleFilters;