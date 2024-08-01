'use client'
import { useState } from "react";
import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { SlideOutMenu } from "@/app/components/navigation/SlideOutMenu";

const Menu = () => {
    const [menuVisible, setMenuVisible] = useState(false)

    return (
        <>
            <div className="mt-3">
                <BurgerMenuButton transitionMenu={() => setMenuVisible(true)} />
            </div>
            <SlideOutMenu menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
        </>
    )
};


export default Menu;