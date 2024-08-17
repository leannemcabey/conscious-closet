import Image from "next/image";

interface BergerMenuButtonProps {
    transitionMenu: () => void
}

export const BurgerMenuButton = ({ transitionMenu }: BergerMenuButtonProps) => {
    return (
        <div className="w-[25px] h-[25px]">
            <Image
                onClick={() => transitionMenu()}
                src="/burger-menu-icon.svg"
                height="20"
                width="20"
                alt="burger menu icon"
                className="w-full"
            />
        </div>
    )
}