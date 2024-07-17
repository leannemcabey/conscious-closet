'use server'
import Layout from "@/app/components/Layout";
import ArticleImage from "@/app/components/articles/ArticleImage";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import AddOrRemoveFromCleanoutBag from "@/app/components/cleanoutBag/AddOrRemoveFromCleanoutBag";
import AddArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import BackButton from "@/app/components/navigation/BackButton";
import AddOrRemoveFromTailoring from "@/app/components/needsTailoring/AddOrRemoveFromTailoring";
import { getArticle } from "@/app/server-actions/article/getArticle";
import ArticlePageContainer from "@/app/components/articles/ArticlePageContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function ArticlePage({ params }: { id: string }) {
    const { article, error} = await getArticle(params.id)

    const errorMessage = "An error occurred when retrieving this article. Please go back and try again."

    return (
        <Layout>
            <BackButton />
            {error && <ErrorPageContainer errorMessage={errorMessage} />}
            {article && <ArticlePageContainer article={article} />}
        </Layout>
    )
}