import * as React from "react";
import Layout from "@/app/components/Layout";
import CleanoutBagContainer from "@/app/components/cleanoutBag/CleanoutBagContainer";
import { getArticlesInCleanoutBag } from "@/app/server-actions/cleanout-bag/getArticlesInCleanoutBag";
import Image from "next/image";
import BackButton from "@/app/components/buttons/BackButton";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";
import EditSuitcaseButton from "@/app/components/suitcases/EditSuitcaseButton";
import DeleteSuitcaseButton from "@/app/components/suitcases/DeleteSuitcaseButton";
import IconButton from "@/app/components/buttons/IconButton";
import Link from "next/link";
import DeleteAllFromCleanoutButton from "@/app/components/cleanoutBag/DeleteAllFromCleanoutButton";
import CleanoutRecsButton from "@/app/components/cleanoutBag/CleanoutRecsButton";

export default async function CleanoutBag() {
    const {articles, error } = await getArticlesInCleanoutBag();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <>
                <div className="flex place-content-between">
                    <BackButton/>
                    <div className="h-max flex space-x-2 md:mt-4">
                        <CleanoutRecsButton />
                        <DeleteAllFromCleanoutButton disabled={articles.length <= 0}/>
                    </div>
                </div>

                {error && <ErrorPageContainer errorMessage={errorMessage}/>}

                {articles && (
                    <div className="h-[95%] mt-2.5">
                        <PageHeader title="cleanout bag" iconPath="/broom.svg" iconAlt="broom icon"/>
                        <CleanoutBagContainer articles={articles}/>
                    </div>
                )}
            </>
        </Layout>
    )
};