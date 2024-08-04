'use client'
import { Weather } from "@/app/components/articles/Weather";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { Dispatch, SetStateAction } from "react";
import IconButton from "@/app/components/buttons/IconButton";

interface WeatherPickerProps {
    weatherCategory: WeatherCategoryEnum | undefined;
    setWeatherCategory: Dispatch<SetStateAction<WeatherCategoryEnum>>
}

export const WeatherPicker = ({ weatherCategory, setWeatherCategory }: WeatherPickerProps) => {
    const sizeStyling = "w-[60px] h-[60px] md:w-[80px] md:h-[80px]";
    const colorStyling = {active: "bg-theme-light-green", inactive: "bg-white"}

    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <IconButton
                handleClick={() => setWeatherCategory(WeatherCategoryEnum.WARM)}
                isActive={weatherCategory === WeatherCategoryEnum.WARM}
                iconPath="/weather-icon-warm.svg" iconAlt="warm weather icon"
                sizeOverride={sizeStyling}
                colorOverride={colorStyling}
            />

            <IconButton
                handleClick={() => setWeatherCategory(WeatherCategoryEnum.MIXED)}
                isActive={weatherCategory === WeatherCategoryEnum.MIXED}
                iconPath="/weather-icon-mixed.svg" iconAlt="mixed weather icon"
                sizeOverride={sizeStyling}
                colorOverride={colorStyling}
            />

            <IconButton
                handleClick={() => setWeatherCategory(WeatherCategoryEnum.COLD)}
                isActive={weatherCategory === WeatherCategoryEnum.COLD}
                iconPath="/weather-icon-cold.svg" iconAlt="cold weather icon"
                sizeOverride={sizeStyling}
                colorOverride={colorStyling}
            />
        </div>
    )
}