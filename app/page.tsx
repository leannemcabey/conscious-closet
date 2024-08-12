import * as React from "react";
import LandingPageContainer from "@/app/components/landing/LandingPageContainer";

export const dynamic = 'force-dynamic';

export default async function Index() {
    return (
        <div>
            <LandingPageContainer />
        </div>
    );
};
