'use client'
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { Dispatch, SetStateAction } from "react";
import IconButton from "@/app/components/buttons/IconButton";
import FilterButton from "@/app/components/buttons/FilterButton";

interface WeatherFilterProps {
    selectedWeatherCategories: WeatherCategoryEnum[];
    setSelectedWeatherCategories: Dispatch<SetStateAction<WeatherCategoryEnum[] |undefined>>;
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

    const weatherCategoryIsSelected = (category: WeatherCategoryEnum) => selectedWeatherCategories.includes(category)

    return (
        <div className="flex space-x-1">
            <FilterButton
                handleClick={() => updateWeatherCategories(WeatherCategoryEnum.WARM)}
                isActive={weatherCategoryIsSelected(WeatherCategoryEnum.WARM)}
                iconPath={weatherCategoryIsSelected(WeatherCategoryEnum.WARM) ? "/weather-icon-warm-green.svg" : "/weather-icon-warm-gray.svg"}
                iconAlt="warm weather icon"
            />

            <FilterButton
                handleClick={() => updateWeatherCategories(WeatherCategoryEnum.MIXED)}
                isActive={weatherCategoryIsSelected(WeatherCategoryEnum.MIXED)}
                iconPath={weatherCategoryIsSelected(WeatherCategoryEnum.MIXED) ? "/weather-icon-mixed-green.svg" : "/weather-icon-mixed-gray.svg"}
                iconAlt="mixed weather icon"
            />

            <FilterButton
                handleClick={() => updateWeatherCategories(WeatherCategoryEnum.COLD)}
                isActive={weatherCategoryIsSelected(WeatherCategoryEnum.COLD)}
                iconPath={weatherCategoryIsSelected(WeatherCategoryEnum.COLD) ? "/weather-icon-cold-green.svg" : "/weather-icon-cold-gray.svg"}
                iconAlt="cold weather icon"
            />
        </div>
    )
}

export default WeatherFilter;