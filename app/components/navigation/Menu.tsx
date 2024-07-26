'use client'
import { useState } from "react";
import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { SlideOutMenu } from "@/app/components/navigation/SlideOutMenu";

const Menu = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <>
            <BurgerMenuButton transitionMenu={() => setMenuVisible(true)} />
            <SlideOutMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </>
    )
};


export default Menu;