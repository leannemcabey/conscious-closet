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
        <div className="flex text-left space-x-2">
            <div className="w-[30px] h-[30px] rounded-lg bg-theme-green p-1">
                <Image
                    src={iconPath}
                    height="30"
                    width="30"
                    alt={iconAlt}
                    className="w-full"
                />
            </div>
            <p className="w-[120px] font-bold tracking-wide">
                {children}
            </p>
        </div>
    )
}

export default InfoCard;