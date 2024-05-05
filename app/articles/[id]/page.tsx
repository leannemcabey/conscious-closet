'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/toArticle";
import Layout from "@/app/components/Layout";
import ArticleImage from "@/app/components/articles/ArticleImage";
import { Article } from "@/types/Article";
import LastWorn from "@/app/components/articles/LastWorn";
import Image from "next/image";
import DeleteArticle from "@/app/components/DeleteArticle";

export default async function ArticlePage({ params }: { id: string }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('id', params.id);
    // Converts the article to non-db Article type
    const mappedArticle: Article | undefined = articles?.map((article) => toArticle(article))[0]

    if (mappedArticle) {
        return (
            <Layout>
                <ArticleImage externalImageId={mappedArticle.image.imageId} />
                <p>Category: {mappedArticle.articleCategory}</p>
                <LastWorn article={mappedArticle} />
                <p>Weather category: {mappedArticle.weatherCategory}</p>
                <p>In cleanout bag: {mappedArticle.inCleanoutBag ? "yes" : "no"}</p>
                <div className="flex">
                    <Image src={"/luggage-icon.png"} alt={"luggage icon"} width="25" height="25" />
                    <Image src={"/broom-icon.png"} alt={"broom icon"} width="25" height="25" />
                    <DeleteArticle article={mappedArticle}/>
                </div>
            </Layout>
        )
    }
}