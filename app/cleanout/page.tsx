import * as React from "react";
import Layout from "@/app/components/Layout";
import CleanoutBagContainer from "@/app/components/cleanoutBag/CleanoutBagContainer";
import { getArticlesInCleanoutBag } from "@/app/server-actions/cleanout-bag/getArticlesInCleanoutBag";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";

export default async function CleanoutBag() {
    const articles = await getArticlesInCleanoutBag();

    return (
        <Layout>
            <BackButton />
            <div className="mt-2.5">
                <div className="flex justify-center">
                    <h1 className="text-2xl mb-4 mr-2">cleanout bag</h1>
                    <div>
                        <Image
                            src={"/broom.svg"}
                            alt={"broom icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>

                <CleanoutBagContainer articles={articles}/>
            </div>
        </Layout>
    )
};