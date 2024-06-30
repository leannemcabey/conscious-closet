'use server'
import Layout from "@/app/components/Layout";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import NewArticleContainer from "@/app/components/articles/new/NewArticleContainer";

export default async function NewArticlePage({ params }: { params: { id: string } }) {
    return (
        <Layout>
            <NewArticleContainer category={params.id as ArticleCategory} />
        </Layout>
    )
};