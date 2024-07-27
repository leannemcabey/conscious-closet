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
            <div className="mt-4 flex justify-center w-full">
                <h1 className="text-lg mb-4 mr-2">recycling | donating | thrifting</h1>
                <div>
                    <Image
                        src={"/earth.svg"}
                        alt={"earth icon"}
                        width="25"
                        height="25"
                    />
                </div>
            </div>
            <CleanoutRecommendationsContainer/>
        </Layout>
    )
}