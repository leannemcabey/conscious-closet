import * as React from "react";
import Image from 'next/image'
import Link from "next/link";
import { useState } from "react";
import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { SlideOutMenu } from "@/app/components/navigation/SlideOutMenu";

export default function TopNavigation() {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <div data-testid="top-nav" className="fixed z-10 w-full h-8 md:h-10 flex place-content-between pt-1 px-2 bg-white drop-shadow-md">
            <div className="flex self-center">
                <Link href="/home">
                    <div className="w-[100px] md:w-[150px]">
                        <Image src="/conscious-closet-full.svg" width="150" height="42" alt="Conscious Closet icon" className="w-full" />
                    </div>
                </Link>
            </div>

            <div className="mt-1">
                <BurgerMenuButton transitionMenu={() => setMenuVisible(true)}/>
            </div>

            <SlideOutMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>
        </div>
    )
};