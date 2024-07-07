import { WeatherCategory } from "@/types/enums/WeatherCategory";
import Image from "next/image";

interface WeatherPickerProps {
    isSelected: boolean
    iconPath: string
    weatherCategory: WeatherCategory
}

export const Weather = ({ isSelected, iconPath, weatherCategory }: WeatherPickerProps) => {
    return (
        <div className={`flex justify-center p-1 rounded-md ${isSelected && "bg-theme-gray drop-shadow"}`}>
            <Image src={iconPath} height="40" width="40" alt={`${weatherCategory} weather icon`} />
        </div>
    )
}