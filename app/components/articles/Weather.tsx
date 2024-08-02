import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import Image from "next/image";

interface WeatherPickerProps {
    isSelected: boolean
    iconPath: string
    weatherCategory: WeatherCategoryEnum
    size: "small" | "large"
}

export const Weather = ({ isSelected, iconPath, weatherCategory, size }: WeatherPickerProps) => {
    const imageSize = size === "small" ? "40" : "60"
    const sizeStyles = {
        small: "w-[40px] md:w-[50px]",
        large: "w-[60px] md:w-[80px]"
    }

    return (
        <div className={`flex justify-center p-2 rounded-full ${isSelected && "bg-white"} drop-shadow ${sizeStyles[size]}`}>
            <Image
                src={iconPath}
                height={imageSize}
                width={imageSize}
                alt={`${weatherCategory} weather icon`}
                className="w-full"/>
        </div>
    )
}