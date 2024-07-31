'use server'
import Layout from "@/app/components/Layout";
import { ArticleCategoryEnum, categorySlugToTitleMap}  from "@/types/enums/articleCategoryEnum";
import BackButton from "@/app/components/navigation/BackButton";
import CategoryPageContainer from "@/app/components/articles/CategoryPageContainer";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import Image from "next/image";
import * as React from "react";

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
                        <div className="flex justify-center items-center mb-4">
                            <h1 className="text-lg md:text-3xl mr-2">{categorySlugToTitleMap[params.id]}</h1>
                            <div>
                                <Image
                                    src={"/hanger.svg"}
                                    alt={"hanger icon"}
                                    width="25"
                                    height="25"
                                />
                            </div>
                        </div>
                        <CategoryPageContainer articles={articles} category={params.id as ArticleCategoryEnum}/>
                    </>
                )}
            </div>
        </Layout>
    )
};