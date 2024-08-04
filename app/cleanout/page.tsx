import * as React from "react";
import Layout from "@/app/components/Layout";
import CleanoutBagContainer from "@/app/components/cleanoutBag/CleanoutBagContainer";
import { getArticlesInCleanoutBag } from "@/app/server-actions/cleanout-bag/getArticlesInCleanoutBag";
import Image from "next/image";
import BackButton from "@/app/components/buttons/BackButton";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";

export default async function CleanoutBag() {
    const {articles, error } = await getArticlesInCleanoutBag();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <BackButton />

            {error && <ErrorPageContainer errorMessage={errorMessage} />}

            {articles && (
                <div className="h-[95%] mt-2.5">
                    <PageHeader title="cleanout bag" iconPath="/broom.svg" iconAlt="broom icon" />
                    <CleanoutBagContainer articles={articles}/>
                </div>
            )}
        </Layout>
    )
};