'use server'
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Suitcase } from "@/types/Suitcase";
import { toSuitcase } from "@/utils/conversions/toSuitcase";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import {setSuitcaseArticles} from "@/app/server-actions/suitcase/getSuitcaseArticles";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import {Article} from "@/types/Article";
import {toArticle} from "@/utils/conversions/toArticle";

export default async function Suitcase({ params }: { id: string }) {
    const supabase = createClient();

    const { data: suitcases } = await supabase.from("suitcases").select().eq('id', params.id);
    const articlesIds = await setSuitcaseArticles(params.id);
    const { data: articles } = await supabase.from("articles").select().in('id', articlesIds);
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];


    // Converts the suitcase to non-db Suitcase type
    const mappedSuitcase: Suitcase | undefined = suitcases?.map((suitcase) => toSuitcase(suitcase))[0]

    return (
        <Layout>
            <BackButton />
            <div className="flex justify-center mt-8">
                <h1 className="text-2xl mb-8 mr-2">{mappedSuitcase?.name}</h1>
                <div>
                    <Image
                        src={"/luggage-icon.png"}
                        alt={"luggage icon"}
                        width="30"
                        height="30"
                    />
                </div>
            </div>
            <ArticlesContainer articles={mappedArticles} />
        </Layout>
    )
};