'use client'

import * as React from "react";
import { FC } from "react";
import { slide as SlideMenu } from 'react-burger-menu'
import Image from "next/image";
import Link from "next/link";
import { useUserContext } from "@/hooks/useUserContext";

const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '16px',
        height: '16px',
        right: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#ffffff',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#7c9e7b',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}


export default function Menu() {
    const { authenticatedUser } = useUserContext()

    return (
        <SlideMenu right width={ '250px' } styles={ styles } >
            <p className="font-bold text-black text-sm mb-8 pb-4 border-b border-black">{authenticatedUser?.email}</p>

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
        </SlideMenu>
    )
};