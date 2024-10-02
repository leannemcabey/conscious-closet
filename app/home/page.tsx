import Layout from "@/app/components/Layout";
import * as React from "react";
import HomePageContainer from "@/app/components/home/HomePageContainer";

// This forces the PWA to load this page dynamically. Without doing this, I believe the build was breaking.
export const dynamic = 'force-dynamic';

export default async function Home() {
    return (
        <Layout>
            <HomePageContainer />
        </Layout>
    )
}
