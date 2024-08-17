import Image from "next/image";

interface BergerMenuButtonProps {
    transitionMenu: () => void
}

export const BurgerMenuButton = ({ transitionMenu }: BergerMenuButtonProps) => {
    return (
        <div className="w-[20px] h-[20px] md:w-[30px] h-[30px] lg:w-[24px] lg:h-[24px]">
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