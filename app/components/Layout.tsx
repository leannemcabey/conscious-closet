import * as React from "react";
import TopNavigation from "./navigation/TopNavigation";
import { ReactElement } from "react";

interface LayoutProps {
    children: ReactElement;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div data-testid="layout" className="relative">
            <TopNavigation />
            <main className="h-screen w-screen overflow-hidden pt-20 px-5 bg-background-green">
                {children}
            </main>
        </div>
    )
};