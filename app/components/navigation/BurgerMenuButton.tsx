import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface BergerMenuButtonProps {
    menuVisible: boolean
    setMenuVisible: Dispatch<SetStateAction<boolean>>
}

export const BurgerMenuButton = ({ menuVisible, setMenuVisible }) => {
    return (
        <Image
            onClick={() => setMenuVisible(!menuVisible)}
            src="/burger-menu-icon.svg"
            height="24"
            width="24"
            alt="burger menu icon"
        />
    )
}