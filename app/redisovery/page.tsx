import * as React from "react";
import Layout from "@/app/components/Layout";
import { Article } from "@/types/article";
import { toArticle } from "@/utils/typeConversions/toArticle";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import {getArticlesNeedingTailoring} from "@/app/server-actions/needs-tailoring/getArticlesNeedingTailoring";
import NeedsTailoringContainer from "@/app/components/needsTailoring/NeedsTailoringContainer";
import {getLeastWornArticles} from "@/app/server-actions/article/getLeastWornArticles";
import LeastWornContainer from "@/app/components/articles/LeastWornContainer";

export default async function Rediscovery() {
    const articles = await getLeastWornArticles();
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];

    return (
        <Layout>
            <BackButton />
            <div className="mt-4">
                <div className="flex justify-center">
                    <h1 className="text-2xl mb-4 mr-2">rediscovery</h1>
                    <div>
                        <Image
                            src={"/lightbulb.svg"}
                            alt={"light bulb icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>

                <div className="mt-2 mb-6 text-center">
                    <p className="text-xl mb-2 text-theme-blue">
                        Rediscover your forgotten clothes!
                    </p>
                    <p>
                        We noticed you haven't worn these items in the last 6 months.
                        By rediscovering what you already own, you'll feel less compelled to purchase more.
                    </p>
                </div>

                <LeastWornContainer articles={mappedArticles}/>
            </div>
        </Layout>
    )
};