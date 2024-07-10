import { WeatherCategory } from "@/types/enums/WeatherCategory";
import Image from "next/image";

interface WeatherPickerProps {
    isSelected: boolean
    iconPath: string
    weatherCategory: WeatherCategory
    size: "small" | "large"
}

export const Weather = ({ isSelected, iconPath, weatherCategory, size }: WeatherPickerProps) => {
    const imageSize = size === "small" ? "25" : "40"

    return (
        <div className={`flex justify-center p-1 rounded-md ${isSelected && "bg-white"} drop-shadow`}>
            <Image src={iconPath} height={imageSize} width={imageSize} alt={`${weatherCategory} weather icon`} />
        </div>
    )
}