'use client'
import * as React from "react";
import TopNavigation from "./navigation/TopNavigation";
import { ReactElement } from "react";
import useNetworkStatus from "@/app/customHooks/useNetworkStatus";
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
                <main className="h-screen w-screen overflow-hidden pt-9 px-1 bg-background-green">
                    {children}
                </main>
            </div>
        )
    } else {
        return <OfflineContainer />
    }
};