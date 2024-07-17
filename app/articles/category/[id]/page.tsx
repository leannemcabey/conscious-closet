'use server'
import Layout from "@/app/components/Layout";
import { Article } from "@/types/article";
import { ArticleCategoryEnum, categorySlugToTitleMap}  from "@/types/enums/articleCategoryEnum";
import { toArticle } from "@/utils/typeConversions/toArticle";
import BackButton from "@/app/components/navigation/BackButton";
import CategoryPageContainer from "@/app/components/articles/CategoryPageContainer";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function ArticleCategoryPage({ params }: { params: { id: string } }) {
    const { articles, error} = await getArticlesByCategory(params.id);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <div className="h-full text-center justify-center mt-2.5 text-2xl">
                <BackButton />

                {error && <ErrorPageContainer errorMessage={errorMessage} />}

                {articles && (
                    <>
                        <h1 className="mb-4">{categorySlugToTitleMap[params.id]}</h1>
                        <CategoryPageContainer articles={articles} category={params.id as ArticleCategoryEnum}/>
                    </>
                )}
            </div>
        </Layout>
    )
};