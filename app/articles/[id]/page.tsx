'use server'
import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/buttons/BackButton";
import { getArticle } from "@/app/server-actions/article/getArticle";
import ArticlePageContainer from "@/app/components/articles/ArticlePageContainer";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function ArticlePage({ params }: { params: { id: string }}) {
    const { article, error} = await getArticle(params.id)

    const errorMessage = "An error occurred when retrieving this article. Please go back and try again."

    return (
        <Layout>
            <>
                <BackButton />
                {error && <ErrorPageContainer errorMessage={errorMessage} />}
                {article && <ArticlePageContainer article={article} />}
            </>
        </Layout>
    )
};