import * as React from "react";
import Layout from "@/app/components/Layout";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import { getLeastWornArticles } from "@/app/server-actions/article/getLeastWornArticles";
import RediscoveryContainer from "@/app/components/articles/RediscoveryContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";

export default async function Rediscovery() {
    const {articles, error } = await getLeastWornArticles();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <BackButton />

            {error && <ErrorPageContainer errorMessage={errorMessage} />}

            {articles && (
                <div className="flex flex-col mt-2.5 h-[95%]">
                    <PageHeader title="rediscovery" iconPath="/lightbulb.svg" iconAlt="light bulb icon" />

                    <div className="flex justify-center">
                        <p className="mt-1 mb-4 text-center text-sm text-neutral-400 max-w-[500px] md:text-lg">
                            We noticed you haven't worn these items in the last 6 months.
                            By rediscovering what you already own, you'll feel less compelled to purchase more.
                        </p>
                    </div>

                    <RediscoveryContainer articles={articles}/>
                </div>
            )}
        </Layout>
    )
};