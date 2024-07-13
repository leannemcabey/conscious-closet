'use server'
import Layout from "@/app/components/Layout";
import CleanoutRecommendationsContainer from "@/app/components/cleanoutBag/CleanoutRecommendationsContainer";
import Image from "next/image";
import * as React from "react";
import BackButton from "@/app/components/navigation/BackButton";

export default async function CleanoutBag() {
    return (
        <Layout>
            <BackButton />
            <div className="mt-4 flex justify-center">
                <h1 className="text-2xl mb-4 mr-2">recycling | donating | thrifting</h1>
                <div>
                    <Image
                        src={"/earth.svg"}
                        alt={"earth icon"}
                        width="30"
                        height="30"
                    />
                </div>
            </div>
            <CleanoutRecommendationsContainer/>
        </Layout>
    )
}