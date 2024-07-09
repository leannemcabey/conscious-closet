'use client'
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { Weather } from "@/app/components/articles/Weather";
import { Dispatch, SetStateAction } from "react";

interface WeatherFilterProps {
    selectedWeatherCategories: WeatherCategory[];
    setSelectedWeatherCategories: Dispatch<SetStateAction<WeatherCategory[]>>;
}

const WeatherFilter = ({ selectedWeatherCategories, setSelectedWeatherCategories }: WeatherFilterProps) => {
    const updateWeatherCategories = (category: WeatherCategory) => {
        // Deselect
        if (weatherCategoryIsSelected(category)) {
            setSelectedWeatherCategories(selectedWeatherCategories.filter((c) => c !== category))
        }

        // Select
        if (!weatherCategoryIsSelected(category)) {
            setSelectedWeatherCategories([...selectedWeatherCategories, category])
        }

    }

    const weatherCategoryIsSelected = (category) => selectedWeatherCategories.includes(category)

    return (
        <div className="w-1/3 flex place-content-between space-x-2">
            <div
                onClick={() => updateWeatherCategories(WeatherCategory.WARM)}
                className="border border-theme-blue rounded-md"
            >
                <Weather
                    weatherCategory={WeatherCategory.WARM}
                    isSelected={weatherCategoryIsSelected(WeatherCategory.WARM)}
                    iconPath="/warm-weather-icon.svg"
                    size="small"
                />
            </div>

            <div
                onClick={() => updateWeatherCategories(WeatherCategory.MIXED)}
                className="border border-theme-blue rounded-md"
            >
                <Weather
                    weatherCategory={WeatherCategory.MIXED}
                    isSelected={weatherCategoryIsSelected(WeatherCategory.MIXED)}
                    iconPath="/mixed-weather-icon.svg"
                    size="small"
                />
            </div>

            <div
                onClick={() => updateWeatherCategories(WeatherCategory.COLD)}
                className="border border-theme-blue rounded-md"
            >
                <Weather
                    weatherCategory={WeatherCategory.COLD}
                    isSelected={weatherCategoryIsSelected(WeatherCategory.COLD)}
                    iconPath="/cold-weather-icon.svg"
                    size="small"
                />
            </div>
        </div>
    )
}

export default WeatherFilter;