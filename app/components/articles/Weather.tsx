import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import Image from "next/image";

interface WeatherPickerProps {
    isSelected: boolean
    iconPath: string
    weatherCategory: WeatherCategoryEnum
    size: "small" | "large"
}

export const Weather = ({ isSelected, iconPath, weatherCategory, size }: WeatherPickerProps) => {
    const imageSize = size === "small" ? "25" : "40"
    const bgColor = size === "small" ? "bg-white" : "bg-background-green"

    return (
        <div className={`flex justify-center p-1 rounded-md ${isSelected && bgColor} drop-shadow`}>
            <Image src={iconPath} height={imageSize} width={imageSize} alt={`${weatherCategory} weather icon`} className="max-w-full"/>
        </div>
    )
}