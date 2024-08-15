import Image from "next/image";
import * as React from "react";
import { ReactElement } from "react";

interface InfoCardProps {
    iconPath: string;
    iconAlt: string;
    children: ReactElement;
}

const InfoCard = ({ iconPath, iconAlt, children }: InfoCardProps) => {
    return (
        <div className="flex text-sm text-left text-neutral-700 space-x-2 md:space-x-4 md:text-xl">
            <div className="h-max">
                <div className="w-[25px] h-[25px] md:w-[40px] md:h-[40px]">
                    <Image
                        src={iconPath}
                        height="25"
                        width="25"
                        alt={iconAlt}
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default InfoCard;