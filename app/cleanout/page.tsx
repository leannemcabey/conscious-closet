import * as React from "react";
import Layout from "@/app/components/Layout";
import CleanoutBagContainer from "@/app/components/cleanoutBag/CleanoutBagContainer";
import { getArticlesInCleanoutBag } from "@/app/server-actions/cleanout-bag/getArticlesInCleanoutBag";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import PageHeader from "@/app/components/PageHeader";
import DeleteAllFromCleanoutButton from "@/app/components/cleanoutBag/DeleteAllFromCleanoutButton";
import CleanoutRecsButton from "@/app/components/cleanoutBag/CleanoutRecsButton";

export default async function CleanoutBag() {
    const {articles, error } = await getArticlesInCleanoutBag();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <>
                <div className="h-max flex justify-end space-x-2 mt-1 md:mt-2.5 mr-1">
                    <CleanoutRecsButton />
                    <DeleteAllFromCleanoutButton disabled={articles.length <= 0}/>
                </div>

                {error && <ErrorPageContainer errorMessage={errorMessage}/>}

                {articles && (
                    <div className="h-[95%] mt-2">
                        <PageHeader title="cleanout bag" iconPath="/broom.svg" iconAlt="broom icon"/>
                        <CleanoutBagContainer articles={articles}/>
                    </div>
                )}
            </>
        </Layout>
    )
};