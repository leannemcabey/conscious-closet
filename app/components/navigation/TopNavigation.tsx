import * as React from "react";
import { FC } from "react";
import Image from 'next/image'
import Menu from "./Menu";
import Link from "next/link";

export default function TopNavigation() {
    return (
        <div data-testid="top-nav" className="fixed z-10 w-full flex place-content-between pt-3 px-6 bg-white drop-shadow-md">
            <div className="flex self-center">
                <Link href="/home">
                    <Image src="/cc_negative.svg" width="40" height="40" alt="Conscious Closet icon" className="pb-2"/>
                </Link>
            </div>
            <Menu />
        </div>
    )
};