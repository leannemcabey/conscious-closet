import Image from "next/image";
import * as React from "react";

interface PageHeaderProps {
    title: string;
    iconPath?: string;
    iconAlt?: string;
}

const PageHeader = ({ title, iconPath, iconAlt }: PageHeaderProps) => {
    return (
        <div className="flex justify-center items-center mb-4 md:mb-8">
            <h1 className={`text-lg tracking-widest md:text-3xl ${iconPath && "mr-1 md:mr-2.5"}`}>{title}</h1>
            {iconPath && iconAlt && (
                <div className="w-[25px] md:w-[40px]">
                    <Image
                        src={iconPath}
                        alt={iconAlt}
                        width="25"
                        height="25"
                        className="w-full"
                    />
                </div>
            )}
        </div>
    )
}

export default PageHeader;