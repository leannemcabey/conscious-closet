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
            <div className="mt-4 flex justify-center">
                <h1 className="text-2xl mb-4 mr-2">laundry symbol cheat sheet</h1>
                <div>
                    <Image
                        src={"/laundry.svg"}
                        alt={"laundry icon"}
                        width="30"
                        height="30"
                    />
                </div>

            </div>
            <LaundrySymbolsContainer />
        </Layout>
    )
}