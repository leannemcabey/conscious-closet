'use server'
import Layout from "@/app/components/Layout";
import { ArticleCategoryEnum, categorySlugToTitleMap}  from "@/types/enums/articleCategoryEnum";
import CategoryPageContainer from "@/app/components/articles/CategoryPageContainer";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import * as React from "react";
import PageHeader from "@/app/components/PageHeader";
import { getAllArticleExternalIds } from "@/app/server-actions/article/getAllArticleExternalIds";

export default async function ArticleCategoryPage({ params }: { params: { id: string } }) {
    const { articles, error} = await getArticlesByCategory(params.id  as ArticleCategoryEnum);
    const allArticleExternalIds: Set<string> = await getAllArticleExternalIds();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <div className="page-container">
                {error && <ErrorPageContainer errorMessage={errorMessage} />}

                {articles && (
                    <>
                        <PageHeader title={categorySlugToTitleMap[params.id as ArticleCategoryEnum]} iconPath={"/hanger.svg"} iconAlt={"hanger icon"} />
                        <CategoryPageContainer articles={articles} category={params.id as ArticleCategoryEnum} allArticleExternalIds={allArticleExternalIds} />
                    </>
                )}
            </div>
        </Layout>
    )
};