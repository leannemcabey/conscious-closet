'use client'
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { Weather } from "@/app/components/articles/Weather";
import { Dispatch, SetStateAction } from "react";

interface WeatherFilterProps {
    selectedWeatherCategories: WeatherCategoryEnum[];
    setSelectedWeatherCategories: Dispatch<SetStateAction<WeatherCategoryEnum[]>>;
}

const WeatherFilter = ({ selectedWeatherCategories, setSelectedWeatherCategories }: WeatherFilterProps) => {
    const updateWeatherCategories = (category: WeatherCategoryEnum) => {
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
        <div className="flex place-content-between space-x-1">
            <div
                onClick={() => updateWeatherCategories(WeatherCategoryEnum.WARM)}
                className="border border-theme-blue rounded-full"
            >
                <Weather
                    weatherCategory={WeatherCategoryEnum.WARM}
                    isSelected={weatherCategoryIsSelected(WeatherCategoryEnum.WARM)}
                    iconPath="/weather-icon-warm.svg"
                    size="small"
                />
            </div>

            <div
                onClick={() => updateWeatherCategories(WeatherCategoryEnum.MIXED)}
                className="border border-theme-blue rounded-full"
            >
                <Weather
                    weatherCategory={WeatherCategoryEnum.MIXED}
                    isSelected={weatherCategoryIsSelected(WeatherCategoryEnum.MIXED)}
                    iconPath="/weather-icon-mixed.svg"
                    size="small"
                />
            </div>

            <div
                onClick={() => updateWeatherCategories(WeatherCategoryEnum.COLD)}
                className="border border-theme-blue rounded-full"
            >
                <Weather
                    weatherCategory={WeatherCategoryEnum.COLD}
                    isSelected={weatherCategoryIsSelected(WeatherCategoryEnum.COLD)}
                    iconPath="/weather-icon-cold.svg"
                    size="small"
                />
            </div>
        </div>
    )
}

export default WeatherFilter;