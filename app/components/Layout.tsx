'use client'
import * as React from "react";
import TopNavigation from "./navigation/TopNavigation";
import { ReactElement } from "react";
import useNetworkStatus from "@/app/customHooks/useNetworkStatus";
import {useRouter} from "next/navigation";
import Image from "next/image";
import OfflineContainer from "@/app/components/OfflineContainer";

interface LayoutProps {
    children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
    const { isOnline } = useNetworkStatus();

    if (isOnline) {
        return (
            <div data-testid="layout" className="relative">
                <TopNavigation />
                <main className="h-screen w-screen overflow-hidden pt-20 px-5 bg-background-green">
                    {children}
                </main>
            </div>
        )
    } else {
        return <OfflineContainer />
    }
};