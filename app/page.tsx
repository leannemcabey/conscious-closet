import * as React from "react";
import LandingPageContainer from "@/app/components/landing/LandingPageContainer";

// This forces the PWA to load this page dynamically. Without doing this, I believe the build was breaking.
export const dynamic = 'force-dynamic';

export default async function Index() {
    return (
        <div>
            <LandingPageContainer />
        </div>
    );
};
