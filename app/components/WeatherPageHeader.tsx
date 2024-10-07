import Image from "next/image";

interface WeatherPageHeaderProps {
    icon: string;
    alt: string;
}

const WeatherPageHeader = ({ icon, alt }: WeatherPageHeaderProps) => {
    return (
        <div className="flex justify-center items-center h-[60px] -mt-2">
            <div className="w-[40px] md:w-[50px]">
                <Image
                    src={icon}
                    height="60"
                    width="60"
                    alt={alt}
                    className="w-full my-2"
                />
            </div>
        </div>
    )
}

export default WeatherPageHeader;