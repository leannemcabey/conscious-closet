import Layout from "@/app/components/Layout";
import * as React from "react";
import BackButton from "@/app/components/buttons/BackButton";
import LaundrySymbolsContainer from "@/app/components/laundry/LaundrySymbolsContainer";

export const dynamic = 'force-dynamic';

export default async function CleanoutBag() {
    return (
        <Layout>
            <>
                {/*<BackButton />*/}
                <LaundrySymbolsContainer />
            </>
        </Layout>
    )
}