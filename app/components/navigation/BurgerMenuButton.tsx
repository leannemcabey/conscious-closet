import Image from "next/image";

interface BergerMenuButtonProps {
    transitionMenu: () => void
}

export const BurgerMenuButton = ({ transitionMenu }: BergerMenuButtonProps) => {
    return (
        <div className="w-[24px] h-[24px] md:w-[30px] h-[30px]">
            <Image
                onClick={() => transitionMenu()}
                src="/burger-menu-icon.svg"
                height="24"
                width="24"
                alt="burger menu icon"
                className="w-full"
            />
        </div>
    )
}