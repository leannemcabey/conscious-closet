'use server'
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Suitcase } from "@/types/Suitcase";
import { toSuitcase } from "@/utils/conversions/toSuitcase";
import Image from "next/image";
import BackButton from "@/app/components/navigation/BackButton";
import { setSuitcaseArticles } from "@/app/server-actions/suitcase/getSuitcaseArticles";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import { Article } from "@/types/Article";
import { toArticle } from "@/utils/conversions/toArticle";
import EditSuitcaseButton from "@/app/components/suitcases/EditSuitcaseButton";
import DeleteSuitcaseButton from "@/app/components/suitcases/DeleteSuitcaseButton";
import SuitcaseContainer from "@/app/components/suitcases/SuitcaseContainer";

export default async function Suitcase({ params }: { id: string }) {
    const supabase = createClient();

    const { data: suitcases } = await supabase.from("suitcases").select().eq('id', params.id);
    // Converts the suitcase to non-db Suitcase type
    const mappedSuitcase: Suitcase | undefined = suitcases?.map((suitcase) => toSuitcase(suitcase))[0]

    const articlesIds = await setSuitcaseArticles(params.id);
    const { data: articles } = await supabase.from("articles").select().in('id', articlesIds || []);
    // Converts the articles to non-db Article type
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];


    return (
        <Layout>
            <div className="flex place-content-between">
                <BackButton />
                <div className="h-max flex space-x-2">
                    <EditSuitcaseButton suitcase={mappedSuitcase!!}/>
                    <DeleteSuitcaseButton suitcaseId={params.id}/>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <h1 className="text-2xl mb-8 mr-2">{mappedSuitcase!!.name}</h1>
                <div>
                    <Image
                        src={"/luggage-icon.png"}
                        alt={"luggage icon"}
                        width="30"
                        height="30"
                    />
                </div>
            </div>
            <SuitcaseContainer articles={mappedArticles}/>
        </Layout>
    )
};