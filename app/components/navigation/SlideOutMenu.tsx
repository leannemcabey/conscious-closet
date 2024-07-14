'use client'
import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import { createClient } from "@/utils/supabase/client";
import MenuItem from "@/app/components/navigation/MenuItem";
import {Suitcase} from "@/types/suitcase";
import {getSuitcases} from "@/app/server-actions/suitcase/getSuitcases";
import {toSuitcase} from "@/utils/typeConversions/toSuitcase";
import {orderByNewestCreated} from "@/utils/orderByNewestCreated";
import {articleCategoryMenuSubItems} from "@/types/enums/articleCategoryEnum";

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

    const [userEmail, setUserEmail] = useState<string | undefined>();
    const [suitcaseSubItems, setSuitcaseSubItems] = useState<Suitcase[]>();
    const menuRef = useRef(null);

    // Closes the menu if the user clicks outside of it
    const outsideClickHandler = (event) => {
        const includesMenuElement = event.composedPath().includes(menuRef.current!!);
        if (menuRef.current && !includesMenuElement) {
            setMenuVisible(false)
        }
    }

    useEffect(() => {
        supabase.auth.getSession()
            .then((session) => setUserEmail(session.data.session?.user.email))
    }, [])

    useEffect(() => {
        // Closes the menu if the user clicks outside of it
        document.body.addEventListener('click', outsideClickHandler);
        return () => {
            document.body.removeEventListener('click', outsideClickHandler);
        }
    }, []);

    useEffect(() => {
        getSuitcases()
            .then((data) => {
                const suitcases = data?.map((suitcase) => toSuitcase(suitcase)) || [];
                const orderedSuitcases = orderByNewestCreated(suitcases)
                const menuSubItems = orderedSuitcases.map((suitcase) => {
                    return {
                        label: suitcase.name,
                        linkTo: `/suitcases/${suitcase.id}`
                    }
                })
                setSuitcaseSubItems(orderByNewestCreated(menuSubItems))
            })
    }, [])

    return (
        <div ref={menuRef} className={`${isVisible ? 'w-3/4' : 'w-0'} ${classNames.join(' ')}`}>
            <div className="h-screen px-6 flex flex-col bg-white">
                <div className="flex place-content-between mt-6">
                    <LogoutButton />
                    <BurgerMenuButton menuVisible={isVisible} setMenuVisible={setMenuVisible} />
                </div>

               <p className="mt-10 mb-6 py-1 px-2 bg-theme-mid-green text-sm font-bold text-white rounded-full w-max truncate">{userEmail}</p>

                <div className="h-full overflow-scroll">
                    <MenuItem linkTo="/home" imageSrc="/hanger.svg" imageAltText="hanger icon" label="closet" subItems={articleCategoryMenuSubItems()}/>
                    <MenuItem linkTo="/suitcases" imageSrc="/suitcase.svg" imageAltText="suitcase icon" label="suitcases" subItems={suitcaseSubItems} />
                    <MenuItem linkTo="/needs-tailoring" imageSrc="/needle.svg" imageAltText="needle icon" label="needs tailoring" />
                    <MenuItem linkTo="/redisovery" imageSrc="/lightbulb.svg" imageAltText="lightbulb icon" label="redisovery" />
                    <MenuItem linkTo="/cleanout" imageSrc="/broom.svg" imageAltText="broom icon" label="cleanout bag" />
                    <MenuItem linkTo="/cleanout/recommendations" imageSrc="/earth.svg" imageAltText="earth icon" label="cleanout recs" />
                </div>
            </div>
        </div>
    );
}