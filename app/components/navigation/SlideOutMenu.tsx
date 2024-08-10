'use client'
import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import MenuItem from "@/app/components/navigation/MenuItem";
import { articleCategoryMenuSubItems } from "@/utils/articleCategoryMenuSubItems";

interface SlideOutMenuProps {
    menuVisible: boolean
    setMenuVisible: Dispatch<SetStateAction<boolean>>
}

const classNames = [
    "absolute",
    'w-3/4',
    "top-0",
    "bg-white",
    "z-10",
    "h-full",
    "whitespace-nowrap",
    "drop-shadow-lg"
]

export const SlideOutMenu = ({ menuVisible, setMenuVisible }: SlideOutMenuProps) => {
    // const supabase = createClient();
    // const [suitcaseSubItems, setSuitcaseSubItems] = useState<MenuSubItem[] | undefined>();
    const menuRef = useRef(null);
    const [animationClassName, setAnimationClassName] = useState<string>("animate-enter-from-right");

    // Closes the menu if the user clicks outside of it
    const outsideClickHandler = (event: Event) => {
        const includesMenuElement = event.composedPath().includes(menuRef.current!!);
        if (menuRef.current && !includesMenuElement) {
            event.preventDefault()
            event.stopImmediatePropagation()
            exitWithAnimation()
        }
    }

    useEffect(() => {
        // Closes the menu if the user clicks outside of it
        document.body.addEventListener('click', outsideClickHandler);
        return () => {
            document.body.removeEventListener('click', outsideClickHandler);
        }
    }, []);

    const exitWithAnimation = () => {
        setAnimationClassName("animate-exit-to-right")
        setTimeout(() => {
            setMenuVisible(false)
            setAnimationClassName("animate-enter-from-right")
        }, 500)
    }


    /*
    * I'm removing the suitcase subitems for now for two reasons:
    *   1. when adding a suitcase, this list doesn't update, and i'm not sure of a good path to do that
    *   2. As users add more and more suitcases, this list will grow to a place that will be silly to have in the side menu
    * */
    // useEffect(() => {
    //     getSuitcases()
    //         .then((suitcases) => {
    //             const menuSubItems = suitcases.map((suitcase) => {
    //                 return {
    //                     label: suitcase.name,
    //                     linkTo: `/suitcases/${suitcase.id}`
    //                 }
    //             })
    //             if (menuSubItems.length !== 0) setSuitcaseSubItems(menuSubItems)
    //         })
    //         .catch(() => setSuitcaseSubItems(undefined))
    // }, [])

    if (menuVisible) {
        return (
            <div ref={menuRef} className={`${animationClassName} ${classNames.join(' ')}`}>
                <div className="h-screen px-6 flex flex-col bg-white">
                    <div className="flex place-content-between mt-6">
                        <LogoutButton/>
                        <BurgerMenuButton transitionMenu={() => exitWithAnimation()}/>
                    </div>

                    <div className="mt-10 h-full overflow-scroll">
                        <MenuItem linkTo="/home" imageSrc="/hanger.svg" imageAltText="hanger icon" label="closet"
                                  subItems={articleCategoryMenuSubItems()}/>
                        <MenuItem linkTo={"/capsule-creator"} imageSrc="/lightbulb.svg" imageAltText="lightbulb icon"
                                  label="capsule creator"/>
                        <MenuItem linkTo="/suitcases" imageSrc="/suitcase.svg" imageAltText="suitcase icon"
                                  label="suitcases"/>
                        <MenuItem linkTo="/needs-tailoring" imageSrc="/sewing-machine.svg" imageAltText="needle icon"
                                  label="needs tailoring"/>
                        <MenuItem linkTo="/rediscovery" imageSrc="/magnifying-glass.svg"
                                  imageAltText="magnifying glass icon" label="rediscovery"/>
                        <MenuItem linkTo="/laundry-symbols" imageSrc="/wash-with-water.svg" imageAltText="laundry icon"
                                  label="laundry symbols"/>
                        <MenuItem linkTo="/cleanout" imageSrc="/broom.svg" imageAltText="broom icon"
                                  label="cleanout bag"
                                  subItems={[{label: "cleanout recs", linkTo: "/cleanout/recommendations"}]}/>
                        <MenuItem linkTo="/about" imageSrc="/info.svg" imageAltText="info icon" label="about"/>
                    </div>
                </div>
            </div>
        );
    }
}