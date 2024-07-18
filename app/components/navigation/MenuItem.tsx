'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MenuSubItem from "@/app/components/navigation/MenuSubItem";

interface MenuItemProps {
    linkTo: string;
    imageSrc: string;
    imageAltText: string;
    label: string;
    subItems?: any[]
}

const MenuItem = ({ linkTo, imageSrc, imageAltText, label, subItems }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const arrow = isOpen ? "arrow-down" : "arrow-up";
    const alt = isOpen ? "collapse" : "expand";

    return (
        <div className="text-xl flex flex-col py-6 border border-dotted border-neutral-300 border-b-2 border-t-0 border-l-0 border-r-0">
            <div className="flex space-x-4">
                {subItems &&
                    <Image src={`/${arrow}.svg`} width="12" height="12" alt={alt} onClick={() => setIsOpen(!isOpen)}/>
                }

                <Link href={linkTo}>
                    <div className={`flex space-x-2 ${!subItems ? "ml-6": ""}`}>
                        <Image src={imageSrc} width="28" height="28" alt={imageAltText}/>
                        <h2>{label}</h2>
                    </div>
                </Link>
            </div>

            {subItems && isOpen &&
                <div className="mt-4 ml-7 flex flex-col space-y-2.5">
                    {subItems.map((item) => <MenuSubItem label={item.label} linkTo={item.linkTo} key={item.label} />)}
                </div>
            }
        </div>
    )
}

export default MenuItem;