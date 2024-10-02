'use client'
import { Weather } from "@/app/components/articles/Weather";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { Dispatch, SetStateAction } from "react";
import IconButton from "@/app/components/buttons/IconButton";

interface WeatherPickerProps {
    weatherCategory: WeatherCategoryEnum | undefined;
    setWeatherCategory: Dispatch<SetStateAction<WeatherCategoryEnum | undefined>>
}

export const WeatherPicker = ({ weatherCategory, setWeatherCategory }: WeatherPickerProps) => {
    const sizeStyling = "w-[50px] h-[50px]";
    const colorStyling = {active: "bg-theme-green", inactive: "bg-white"}
    const borderStyling = {active: "", inactive: "border border-theme-green"}

    return (
        <div className="flex justify-center items-center space-x-4">
            <IconButton
                handleClick={() => setWeatherCategory(WeatherCategoryEnum.WARM)}
                isActive={weatherCategory === WeatherCategoryEnum.WARM}
                iconPath={weatherCategory === WeatherCategoryEnum.WARM ? "/weather-icon-warm-white.svg" : "/weather-icon-warm.svg"}
                iconAlt="warm weather icon"
                sizeOverride={sizeStyling}
                colorOverride={colorStyling}
                borderOverride={borderStyling}
            />

            <IconButton
                handleClick={() => setWeatherCategory(WeatherCategoryEnum.MIXED)}
                isActive={weatherCategory === WeatherCategoryEnum.MIXED}
                iconPath={weatherCategory === WeatherCategoryEnum.MIXED ? "/weather-icon-mixed-white.svg" : "/weather-icon-mixed.svg"}
                iconAlt="mixed weather icon"
                sizeOverride={sizeStyling}
                colorOverride={colorStyling}
                borderOverride={borderStyling}
            />

            <IconButton
                handleClick={() => setWeatherCategory(WeatherCategoryEnum.COLD)}
                isActive={weatherCategory === WeatherCategoryEnum.COLD}
                iconPath={weatherCategory === WeatherCategoryEnum.COLD ? "/weather-icon-cold-white.svg" : "/weather-icon-cold.svg"}
                iconAlt="cold weather icon"
                sizeOverride={sizeStyling}
                colorOverride={colorStyling}
                borderOverride={borderStyling}
            />
        </div>
    )
}