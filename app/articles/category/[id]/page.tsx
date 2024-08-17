'use server'
import Layout from "@/app/components/Layout";
import { ArticleCategoryEnum, categorySlugToTitleMap}  from "@/types/enums/articleCategoryEnum";
import BackButton from "@/app/components/buttons/BackButton";
import CategoryPageContainer from "@/app/components/articles/CategoryPageContainer";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import * as React from "react";
import PageHeader from "@/app/components/PageHeader";

export default async function ArticleCategoryPage({ params }: { params: { id: string } }) {
    const { articles, error} = await getArticlesByCategory(params.id  as ArticleCategoryEnum);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <>
                <div className="h-full text-center justify-center mt-2.5 text-2xl">
                    {/*<BackButton />*/}

                    {error && <ErrorPageContainer errorMessage={errorMessage} />}

                    {articles && (
                        <>
                            <PageHeader title={categorySlugToTitleMap[params.id as ArticleCategoryEnum]} iconPath={"/hanger.svg"} iconAlt={"hanger icon"} />
                            <CategoryPageContainer articles={articles} category={params.id as ArticleCategoryEnum}/>
                        </>
                    )}
                </div>
            </>
        </Layout>
    )
};