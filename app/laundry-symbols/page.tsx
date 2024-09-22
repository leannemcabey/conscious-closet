import Layout from "@/app/components/Layout";
import * as React from "react";
import LaundrySymbolsContainer from "@/app/components/laundry/LaundrySymbolsContainer";

// This forces the PWA to load this page dynamically. Without doing this, I believe the build was breaking.
export const dynamic = 'force-dynamic';

export default async function CleanoutBag() {
    return (
        <Layout>
            <LaundrySymbolsContainer/>
        </Layout>
    )
}