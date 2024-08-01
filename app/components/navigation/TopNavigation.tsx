import * as React from "react";
import Image from 'next/image'
import Menu from "./Menu";
import Link from "next/link";

export default function TopNavigation() {
    return (
        <div data-testid="top-nav" className="fixed z-10 w-full flex place-content-between py-3 px-6 bg-white drop-shadow-md md:pb-6">
            <div className="flex self-center">
                <Link href="/home">
                    <div className="w-[150px] h-[40px] md:w-[200px] md:-mt-2">
                        <Image src="/cc_full.svg" width="150" height="40" alt="Conscious Closet icon" className="w-full" />
                    </div>
                </Link>
            </div>
            <Menu />
        </div>
    )
};