import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface BergerMenuButtonProps {
    transitionMenu: () => void
}

export const BurgerMenuButton = ({ transitionMenu }) => {
    return (
        <Image
            onClick={() => transitionMenu()}
            src="/burger-menu-icon.svg"
            height="24"
            width="24"
            alt="burger menu icon"
        />
    )
}