'use client'
import { Weather } from "@/app/components/newArticle/Weather";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { useState } from "react";

export const WeatherPicker = () => {
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategory | undefined>(undefined);

    return (
        <div className="flex flex-col">
            <div className="w-16 overflow-hidden inline-block self-end">
                <div className="h-24 bg-neutral-100 rotate-45 transform origin-bottom-left"/>
            </div>
            <div className="h-32 flex flex-col justify-center items-center bg-neutral-100 rounded-lg">
                <p>Select a weather category:</p>
                <div className="w-3/4 flex justify-evenly mt-4">
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
        </div>
    )
}