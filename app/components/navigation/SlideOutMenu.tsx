import { BurgerMenuButton } from "@/app/components/navigation/BurgerMenuButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Image from "next/image";

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
    "overflow-x-hidden",
    "duration-500",
    "h-full",
    "whitespace-nowrap"
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

                <p className="mt-4 font-bold text-black text-sm mb-8 pb-4 border-b border-black">{userEmail}</p>

                <Link href="/home">
                    <div className="flex space-x-4 mb-6">
                        <Image src="/hanger-icon.png" height="16" width="22" alt="hanger icon"/>
                        <span>Closet</span>
                    </div>
                </Link>

                <Link href="/packing">
                    <div className="flex space-x-4 mb-6">
                        <Image src="/luggage-icon.png" height="16" width="22" alt="luggage icon"/>
                        <span>Packing</span>
                    </div>
                </Link>

                <Link href="/clean-out">
                    <div className="flex space-x-4 mb-6">
                        <Image src="/broom-icon.png" height="16" width="20" alt="broom icon"/>
                        <span>Clean-out bag</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}