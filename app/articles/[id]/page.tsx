'use server'
import { createClient } from "@/utils/supabase/server";
import Layout from "@/app/components/Layout";
import ArticleImage from "@/app/components/articles/ArticleImage";
import { Article } from "@/types/article";
import LastWorn from "@/app/components/articles/LastWorn";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import AddOrRemoveFromCleanoutBag from "@/app/components/cleanoutBag/AddOrRemoveFromCleanoutBag";
import AddArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import BackButton from "@/app/components/navigation/BackButton";
import { toArticle } from "@/utils/conversions/toArticle";
import ArticleWeatherCategory from "@/app/components/articles/ArticleWeatherCategory";

export default async function ArticlePage({ params }: { id: string }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('id', params.id);
    // Converts the article to non-db Article type
    const mappedArticle: Article | undefined = articles?.map((article) => toArticle(article))[0]

    if (mappedArticle) {
        return (
            <Layout>
                <BackButton />
                <div className="flex flex-col items-center mt-12">
                    <div className="flex flex-col items-center bg-white w-96 drop-shadow-lg">
                        <div className="mt-4 mb-2 bg-white">
                            <ArticleImage externalImageId={mappedArticle.image.imageId}/>
                        </div>
                        <div className="w-full flex mb-4 space-x-12 justify-center">
                            <LastWorn article={mappedArticle}/>
                            <ArticleWeatherCategory article={mappedArticle} />
                        </div>
                    </div>
                    <div className="flex justify-center space-x-8 mt-16">
                        <AddArticleToSuitcase article={mappedArticle}/>
                        <DeleteArticle article={mappedArticle}/>
                        <AddOrRemoveFromCleanoutBag article={mappedArticle} />
                    </div>
                </div>
            </Layout>
        )
    }
}