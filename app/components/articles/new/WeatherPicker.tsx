'use client'
import { Weather } from "@/app/components/articles/Weather";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { Dispatch, SetStateAction } from "react";

interface WeatherPickerProps {
    weatherCategory: WeatherCategoryEnum | undefined;
    setWeatherCategory: Dispatch<SetStateAction<WeatherCategoryEnum>>
}

export const WeatherPicker = ({ weatherCategory, setWeatherCategory }: WeatherPickerProps) => {
    return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <div onClick={() => setWeatherCategory(WeatherCategoryEnum.WARM)}>
                <Weather
                    weatherCategory={WeatherCategoryEnum.WARM}
                    isSelected={weatherCategory === WeatherCategoryEnum.WARM}
                    iconPath="/weather-icon-warm.svg"
                    select={setWeatherCategory}
                    size="large"
                />
            </div>

            <div onClick={() => setWeatherCategory(WeatherCategoryEnum.MIXED)}>
                <Weather
                    weatherCategory={WeatherCategoryEnum.MIXED}
                    isSelected={weatherCategory === WeatherCategoryEnum.MIXED}
                    iconPath="/weather-icon-mixed.svg"
                    select={setWeatherCategory}
                    size="large"
                />
            </div>

            <div onClick={() => setWeatherCategory(WeatherCategoryEnum.COLD)}>
                <Weather
                    weatherCategory={WeatherCategoryEnum.COLD}
                    isSelected={weatherCategory === WeatherCategoryEnum.COLD}
                    iconPath="/weather-icon-cold.svg"
                    select={setWeatherCategory}
                    size="large"
                />
            </div>
        </div>
    )
}