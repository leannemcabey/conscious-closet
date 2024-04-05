import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import MenuItem from "@/app/components/navigation/MenuItem";

interface SlideOutMenuProps {
    isVisible: boolean
    setMenuVisible: Dispatch<SetStateAction<boolean>>
}

const classNames = [
    "fixed",
    "top-0",
    "right-0",
    // "bg-gradient-to-r",
    // "from-theme-green",
    // "to-theme-blue",
    "bg-theme-light-green",
    "z-10",
    // "overflow-x-hidden",
    // "text-wrap",
    "duration-500",
    "h-full",
    "whitespace-nowrap",
    "drop-shadow-lg"
]

export const SlideOutMenu = ({ isVisible, setMenuVisible }) => {
    const supabase = createClient();
    const [userEmail, setUserEmail] = useState<string | undefined>();

    useEffect(() => {
        supabase.auth.getSession()
            .then((session) => setUserEmail(session.data.session?.user.email))
    }, [])

    return (
        <div className={`${isVisible ? 'w-3/4' : 'w-0'} ${classNames.join(' ')}`}>
            <div className="px-6 flex flex-col">
                <div className="flex place-content-between mt-6">
                    <LogoutButton />
                    <BurgerMenuButton menuVisible={isVisible} setMenuVisible={setMenuVisible} />
                </div>

               <p className="mt-10 mb-6 py-1 px-2 bg-theme-mid-green text-sm font-bold text-white rounded-full w-max truncate">{userEmail}</p>

                <MenuItem linkTo="/home" imageSrc="/hanger-icon.png" imageAltText="hanger icon" label="Closet" />
                <MenuItem linkTo="/packing" imageSrc="/luggage-icon.png" imageAltText="luggage icon" label="Packing" />
                <MenuItem linkTo="/clean-out" imageSrc="/broom-icon.png" imageAltText="broom icon" label="Clean-out bag" />
            </div>
        </div>
    );
}