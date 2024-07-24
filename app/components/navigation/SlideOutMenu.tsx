'use client'
import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import { createClient } from "@/utils/supabase/client";
import MenuItem from "@/app/components/navigation/MenuItem";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { articleCategoryMenuSubItems } from "@/types/enums/articleCategoryEnum";
import {MenuSubItem} from "@/app/components/navigation/MenuSubItemLink";

interface SlideOutMenuProps {
    isVisible: boolean
    setMenuVisible: Dispatch<SetStateAction<boolean>>
}

const classNames = [
    "fixed",
    "top-0",
    "right-0",
    "bg-white",
    "z-10",
    "duration-500",
    "h-full",
    "whitespace-nowrap",
    "drop-shadow-lg",
]

export const SlideOutMenu = ({ isVisible, setMenuVisible }: SlideOutMenuProps) => {
    const supabase = createClient();
    const [suitcaseSubItems, setSuitcaseSubItems] = useState<MenuSubItem[] | undefined>();
    const menuRef = useRef(null);

    // Closes the menu if the user clicks outside of it
    const outsideClickHandler = (event) => {
        const includesMenuElement = event.composedPath().includes(menuRef.current!!);
        if (menuRef.current && !includesMenuElement) {
            setMenuVisible(false)
        }
    }

    useEffect(() => {
        // Closes the menu if the user clicks outside of it
        document.body.addEventListener('click', outsideClickHandler);
        return () => {
            document.body.removeEventListener('click', outsideClickHandler);
        }
    }, []);

    useEffect(() => {
        getSuitcases()
            .then((suitcases) => {
                const menuSubItems = suitcases.map((suitcase) => {
                    return {
                        label: suitcase.name,
                        linkTo: `/suitcases/${suitcase.id}`
                    }
                })
                if (menuSubItems.length !== 0) setSuitcaseSubItems(menuSubItems)
            })
            .catch(() => setSuitcaseSubItems(undefined))
    }, [])

    return (
        <div ref={menuRef} className={`${isVisible ? 'w-3/4' : 'w-0'} ${classNames.join(' ')}`}>
            <div className="h-screen px-6 flex flex-col bg-white">
                <div className="flex place-content-between mt-6">
                    <LogoutButton />
                    <BurgerMenuButton menuVisible={isVisible} setMenuVisible={setMenuVisible} />
                </div>

                <div className="mt-10 h-full overflow-scroll">
                    <MenuItem linkTo="/home" imageSrc="/hanger.svg" imageAltText="hanger icon" label="closet" subItems={articleCategoryMenuSubItems()}/>
                    <MenuItem linkTo={"/outfit-generator"} imageSrc="/lightbulb.svg" imageAltText="lightbulb icon" label="outfit generator" />
                    <MenuItem linkTo="/suitcases" imageSrc="/suitcase.svg" imageAltText="suitcase icon" label="suitcases" subItems={suitcaseSubItems} />
                    <MenuItem linkTo="/needs-tailoring" imageSrc="/needle.svg" imageAltText="needle icon" label="needs tailoring" />
                    <MenuItem linkTo="/redisovery" imageSrc="/lightbulb.svg" imageAltText="lightbulb icon" label="redisovery" />
                    <MenuItem linkTo="/laundry-symbols" imageSrc="/wash-with-water.svg" imageAltText="laundry icon" label="laundry symbols" />
                    <MenuItem linkTo="/cleanout" imageSrc="/broom.svg" imageAltText="broom icon" label="cleanout bag" subItems={[{label: "cleanout recs", linkTo: "/cleanout/recommendations"}]}/>
                    <MenuItem linkTo="/about" imageSrc="/info.svg" imageAltText="info icon" label="about" />
                </div>
            </div>
        </div>
    );
}