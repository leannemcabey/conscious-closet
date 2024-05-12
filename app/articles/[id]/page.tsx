'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/toArticle";
import Layout from "@/app/components/Layout";
import ArticleImage from "@/app/components/articles/ArticleImage";
import { Article } from "@/types/Article";
import LastWorn from "@/app/components/articles/LastWorn";
import Image from "next/image";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import AddOrRemoveFromCleanoutBag from "@/app/components/articles/AddOrRemoveFromCleanoutBag";

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
                <div className="flex">
                    <Image className="mx-4" src={"/luggage-icon.png"} alt={"luggage icon"} width="25" height="25" />
                    <AddOrRemoveFromCleanoutBag article={mappedArticle} />
                    <DeleteArticle article={mappedArticle} />
                </div>
            </Layout>
        )
    }
}