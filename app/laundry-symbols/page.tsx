'use server'
import Layout from "@/app/components/Layout";
import CleanoutRecommendationsContainer from "@/app/components/cleanoutBag/CleanoutRecommendationsContainer";
import Image from "next/image";
import * as React from "react";
import BackButton from "@/app/components/navigation/BackButton";
import LaundrySymbolsContainer from "@/app/components/laundry/LaundrySymbolsContainer";

export default async function CleanoutBag() {
    return (
        <Layout>
            <BackButton />
            <h1 className="text-center text-2xl mt-4 mb-12 mr-2">laundry symbol cheat sheet</h1>
            <LaundrySymbolsContainer />
        </Layout>
    )
}