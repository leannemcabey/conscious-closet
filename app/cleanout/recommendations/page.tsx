import Layout from "@/app/components/Layout";
import CleanoutRecommendationsContainer from "@/app/components/cleanoutBag/CleanoutRecommendationsContainer";
import * as React from "react";
import BackButton from "@/app/components/buttons/BackButton";
import PageHeader from "@/app/components/PageHeader";

export const dynamic = 'force-dynamic';

export default async function CleanoutRecommendations() {
    return (
        <Layout>
            <div className="h-full mt-2">
                <PageHeader title="recycling | donating | thrifting" iconPath="/earth.svg" iconAlt="earth icon" />
                <CleanoutRecommendationsContainer/>
            </div>
        </Layout>
    )
}