import * as React from "react";
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/Article";
import { toArticle } from "@/utils/toArticle";
import CleanoutBagContainer from "@/app/components/cleanoutBag/CleanoutBagContainer";
import { getArticlesInCleanoutBag } from "@/app/server-actions/getArticlesInCleanoutBag";

export default async function CleanOutBag() {
    const supabase = createClient();

    const articles = await getArticlesInCleanoutBag();
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];

    return (
        <Layout>
            <div className="text-center justify-center mt-4 text-2xl">
                <h1>Clean Out Bag</h1>

                <CleanoutBagContainer articles={mappedArticles}/>
            </div>
        </Layout>
    )
};