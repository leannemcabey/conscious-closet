'use client'
import { useState } from "react";
import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { SlideOutMenu } from "@/app/components/navigation/SlideOutMenu";

const Menu = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <>
            <BurgerMenuButton menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
            <SlideOutMenu isVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </>
    )
};


export default Menu;