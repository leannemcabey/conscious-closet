import * as React from "react";
import Layout from "@/app/components/Layout";
import CleanoutBagContainer from "@/app/components/cleanoutBag/CleanoutBagContainer";
import { getArticlesInCleanoutBag } from "@/app/server-actions/cleanout-bag/getArticlesInCleanoutBag";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function CleanoutBag() {
    const {articles, error } = await getArticlesInCleanoutBag();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <BackButton />

            {error && <ErrorPageContainer errorMessage={errorMessage} />}

            {articles && (
                <div className="h-[95%] mt-2.5">
                    <div className="flex justify-center">
                        <h1 className="text-lg mb-4 mr-2">cleanout bag</h1>
                        <div>
                            <Image
                                src={"/broom.svg"}
                                alt={"broom icon"}
                                width="25"
                                height="25"
                            />
                        </div>
                    </div>

                    <CleanoutBagContainer articles={articles}/>
                </div>
            )}
        </Layout>
    )
};