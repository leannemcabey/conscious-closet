import Layout from "@/app/components/Layout";
import * as React from "react";
import HomePageContainer from "@/app/components/home/HomePageContainer";
import { getAllArticleExternalIds } from "@/app/server-actions/article/getAllArticleExternalIds";

export default async function Home() {
    const allArticleExternalIds: Set<string> = await getAllArticleExternalIds();

    return (
        <Layout>
            <HomePageContainer allArticleExternalIds={allArticleExternalIds}/>
        </Layout>
    )
}
