import * as React from "react";
import Layout from "@/app/components/Layout";
import { Article } from "@/types/Article";
import { toArticle } from "@/utils/conversions/toArticle";
import CleanoutBagContainer from "@/app/components/cleanoutBag/CleanoutBagContainer";
import { getArticlesInCleanoutBag } from "@/app/server-actions/getArticlesInCleanoutBag";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";

export default async function CleanoutBag() {
    const articles = await getArticlesInCleanoutBag();
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];

    return (
        <Layout>
            <BackButton />
            <div className="mt-4">
                <div className="flex justify-center">
                    <h1 className="text-2xl mb-4 mr-2">Cleanout Bag</h1>
                    <div>
                        <Image
                            src={"/broom-icon.png"}
                            alt={"broom icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>

                <CleanoutBagContainer articles={mappedArticles}/>
            </div>
        </Layout>
    )
};