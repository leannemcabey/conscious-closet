import * as React from "react";
import TopNavigation from "./TopNavigation";

export default function Layout({ children }) {
    return (
        <div data-testid="layout" className="relative">
            <TopNavigation />
            <main className="min-h-screen py-20 px-5 bg-background-green">
                {children}
            </main>
        </div>
    )
};