import { WeatherCategory } from "@/types/enums/WeatherCategory";
import Image from "next/image";

interface WeatherPickerProps {
    isSelected: boolean
    iconPath: string
    weatherCategory: WeatherCategory
    select: (WeatherCategory) => void
}

export const WeatherPicker = ({ isSelected, iconPath, weatherCategory, select }) => {
    return (
        <button
            onClick={() => select(weatherCategory)}
            className={`flex justify-center p-0.5 rounded-lg ${isSelected && "border border-theme-green"}`}
        >
            <Image src={iconPath} height="40" width="40" alt={`${weatherCategory} weather icon`} />
        </button>
    )
}