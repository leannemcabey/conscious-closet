'use client'
import { Weather } from "@/app/components/articles/new/Weather";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { Dispatch, SetStateAction } from "react";

interface WeatherPickerProps {
    weatherCategory: WeatherCategory | undefined;
    setWeatherCategory: Dispatch<SetStateAction<WeatherCategory>>
}

export const WeatherPicker = ({ weatherCategory, setWeatherCategory }: WeatherPickerProps) => {
    return (
        <div className="mt-4 flex flex-col justify-center items-center">
            <p className="text-lg">Select a weather category:</p>
            <div className="w-3/4 flex justify-evenly mt-2">
                <Weather
                    weatherCategory={WeatherCategory.WARM}
                    isSelected={weatherCategory === WeatherCategory.WARM}
                    iconPath="/warm-weather-icon.svg"
                    select={setWeatherCategory}
                />
                <Weather
                    weatherCategory={WeatherCategory.MIXED}
                    isSelected={weatherCategory === WeatherCategory.MIXED}
                    iconPath="/mixed-weather-icon.svg"
                    select={setWeatherCategory}
                />
                <Weather
                    weatherCategory={WeatherCategory.COLD}
                    isSelected={weatherCategory === WeatherCategory.COLD}
                    iconPath="/cold-weather-icon.svg"
                    select={setWeatherCategory}
                />
            </div>
        </div>
    )
}