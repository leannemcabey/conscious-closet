'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/toArticle";
import Layout from "@/app/components/Layout";
import ArticleImage from "@/app/components/articles/ArticleImage";
import { Article } from "@/types/Article";

export default async function ArticlePage({ params }: { id: string }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('id', params.id);
    const mappedArticle: Article | undefined = articles?.map((article) => toArticle(article))[0]


    if (mappedArticle) {
        return (
            <Layout>
                <ArticleImage externalImageId={mappedArticle.image.imageId} />
                <p>Category: {mappedArticle.articleCategory}</p>
                <p>Last Worn: {mappedArticle.lastWorn ?? "never worn"}</p>
                <p>Weather category: {mappedArticle.weatherCategory}</p>
                <p>In cleanout bag: {mappedArticle.inCleanoutBag ? "yes" : "no"}</p>
            </Layout>
        )
    }
}