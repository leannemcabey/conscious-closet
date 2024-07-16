'use server'
import Layout from "@/app/components/Layout";
import ArticleImage from "@/app/components/articles/ArticleImage";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import AddOrRemoveFromCleanoutBag from "@/app/components/cleanoutBag/AddOrRemoveFromCleanoutBag";
import AddArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import BackButton from "@/app/components/navigation/BackButton";
import AddOrRemoveFromTailoring from "@/app/components/needsTailoring/AddOrRemoveFromTailoring";
import { getArticle } from "@/app/server-actions/article/getArticle";

export default async function ArticlePage({ params }: { id: string }) {
    const article = await getArticle(params.id)

    if (article) {
        return (
            <Layout>
                <BackButton />
                <div className="flex flex-col items-center mt-12">
                    <ArticleImage article={article} />
                    <div className="flex justify-center space-x-8 mt-16">
                        <AddArticleToSuitcase article={article}/>
                        <AddOrRemoveFromTailoring article={article} />
                        <AddOrRemoveFromCleanoutBag article={article} />
                        <DeleteArticle article={article}/>
                    </div>
                </div>
            </Layout>
        )
    }
}