'use client'
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { Dispatch, SetStateAction } from "react";
import FilterButton from "@/app/components/buttons/FilterButton";

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
            <FilterButton
                handleClick={() => updateWeatherCategories(WeatherCategoryEnum.WARM)}
                isActive={weatherCategoryIsSelected(WeatherCategoryEnum.WARM)}
                iconPath="/weather-icon-warm.svg"
                iconAlt="warm weather icon"
            />

            <FilterButton
                handleClick={() => updateWeatherCategories(WeatherCategoryEnum.MIXED)}
                isActive={weatherCategoryIsSelected(WeatherCategoryEnum.MIXED)}
                iconPath="/weather-icon-mixed.svg"
                iconAlt="mixed weather icon"
            />

            <FilterButton
                handleClick={() => updateWeatherCategories(WeatherCategoryEnum.COLD)}
                isActive={weatherCategoryIsSelected(WeatherCategoryEnum.COLD)}
                iconPath="/weather-icon-cold.svg"
                iconAlt="cold weather icon"
            />
        </div>
    )
}

export default WeatherFilter;