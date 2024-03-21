import * as React from "react";
import { FC } from "react";
import Image from 'next/image'
import Menu from "./Menu";
import Link from "next/link";

export default function TopNavigation() {
    return (
        <div data-testid="top-nav" className="fixed z-10 w-full">
            <Menu />
            <div className="flex self-center pt-5 pl-5 bg-background-green">
                <Link href="/home">
                    <Image src="/cc-icon.svg" height="50" width="50" alt="Conscious Closet icon"/>
                </Link>
            </div>
        </div>
    )
};