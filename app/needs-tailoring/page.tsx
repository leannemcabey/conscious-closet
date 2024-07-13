import * as React from "react";
import Layout from "@/app/components/Layout";
import { Article } from "@/types/article";
import { toArticle } from "@/utils/typeConversions/toArticle";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import {getArticlesNeedingTailoring} from "@/app/server-actions/needs-tailoring/getArticlesNeedingTailoring";
import NeedsTailoringContainer from "@/app/components/needsTailoring/NeedsTailoringContainer";

export default async function NeedsTailoring() {
    const articles = await getArticlesNeedingTailoring();
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];

    return (
        <Layout>
            <BackButton />
            <div className="mt-4">
                <div className="flex justify-center">
                    <h1 className="text-2xl mb-4 mr-2">needs tailoring</h1>
                    <div>
                        <Image
                            src={"/needle.svg"}
                            alt={"needle icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>

                <NeedsTailoringContainer articles={mappedArticles}/>
            </div>
        </Layout>
    )
};