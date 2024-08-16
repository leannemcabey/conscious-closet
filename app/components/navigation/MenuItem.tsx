'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MenuSubItemLink, {MenuSubItem} from "@/app/components/navigation/MenuSubItemLink";

interface MenuItemProps {
    linkTo: string;
    imageSrc: string;
    imageAltText: string;
    label: string;
    subItems?: MenuSubItem[]
}

const MenuItem = ({ linkTo, imageSrc, imageAltText, label, subItems }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const arrow = isOpen ? "arrow-down" : "arrow-up";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <div className="text-lg flex flex-col py-4 md:py-6 lg:py-4 border border-dotted border-neutral-300 border-b-2 border-t-0 border-l-0 border-r-0">
            <div className="flex space-x-4">
                {subItems &&
                    <div className="w-[12px] h-[12px] mt-1 md:w-[20px] md:h-[20px] lg:w-[12px] lg:h-[12px]">
                        <Image
                            src={`/${arrow}.svg`}
                            width="12"
                            height="12"
                            alt={alt}
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-full"
                        />
                    </div>
                }

                <Link href={linkTo}>
                    <div className={`flex space-x-4 ${!subItems ? "ml-6 md:ml-9 lg:ml-7": ""}`}>
                        <div className="w-[23px] h-[23px] md:w-[30px] md:h-[30px] lg:w-[23px] lg:h-[23px]">
                            <Image
                                src={imageSrc}
                                width="23"
                                height="23"
                                alt={imageAltText}
                                className="w-full"
                            />
                        </div>
                        <h2 className="md:text-2xl lg:text-base">{label}</h2>
                    </div>
                </Link>
            </div>

            {subItems && isOpen &&
                <div className="mt-4 ml-16 md:ml-20 lg:ml-16 pl-2 flex flex-col space-y-2.5 lg:space-y-1 border border-neutral-300 border-b-0 border-t-0 border-l-1 border-r-0">
                    {subItems.map((item) => <MenuSubItemLink label={item.label} linkTo={item.linkTo} key={item.label} />)}
                </div>
            }
        </div>
    )
}

export default MenuItem;