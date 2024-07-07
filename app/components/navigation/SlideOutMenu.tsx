import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import { createClient } from "@/utils/supabase/client";
import MenuItem from "@/app/components/navigation/MenuItem";

interface SlideOutMenuProps {
    isVisible: boolean
    setMenuVisible: Dispatch<SetStateAction<boolean>>
}

const classNames = [
    "fixed",
    "top-0",
    "right-0",
    "bg-white",
    "z-10",
    "duration-500",
    "h-full",
    "whitespace-nowrap",
    "drop-shadow-lg"
]

export const SlideOutMenu = ({ isVisible, setMenuVisible }: SlideOutMenuProps) => {
    const supabase = createClient();
    const [userEmail, setUserEmail] = useState<string | undefined>();
    const menuRef = useRef(null);

    // Closes the menu if the user clicks outside of it
    const outsideClickHandler = (event) => {
        const includesMenuElement = event.composedPath().includes(menuRef.current!!);
        if (menuRef.current && !includesMenuElement) {
            setMenuVisible(false)
        }
    }

    useEffect(() => {
        supabase.auth.getSession()
            .then((session) => setUserEmail(session.data.session?.user.email))
    }, [])

    useEffect(() => {
        // Closes the menu if the user clicks outside of it
        document.body.addEventListener('click', outsideClickHandler);
        return () => {
            document.body.removeEventListener('click', outsideClickHandler);
        }
    }, []);

    return (
        <div ref={menuRef} className={`${isVisible ? 'w-3/4' : 'w-0'} ${classNames.join(' ')}`}>
            <div className="h-screen px-6 flex flex-col bg-white">
                <div className="flex place-content-between mt-6">
                    <LogoutButton />
                    <BurgerMenuButton menuVisible={isVisible} setMenuVisible={setMenuVisible} />
                </div>

               <p className="mt-10 mb-6 py-1 px-2 bg-theme-mid-green text-sm font-bold text-white rounded-full w-max truncate">{userEmail}</p>

                <MenuItem linkTo="/home" imageSrc="/hanger-icon.png" imageAltText="hanger icon" label="Closet" />
                <MenuItem linkTo="/suitcases" imageSrc="/luggage-icon.png" imageAltText="luggage icon" label="Suitcases" />
                <MenuItem linkTo="/cleanout" imageSrc="/broom-icon.png" imageAltText="broom icon" label="Cleanout bag" />
            </div>
        </div>
    );
}