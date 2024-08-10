'use server'
import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/buttons/BackButton";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import CapsuleCreatorContainer, {CategoryArticlesMap} from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import * as React from "react";

export default async function CapsuleCreator() {
    const errorState = (
        <Layout>
            <>
                <BackButton />
                <ErrorPageContainer errorMessage="An error occurred while retreiving your articles." />
            </>
        </Layout>
    )

    let articlesMap: CategoryArticlesMap = {};

    for (const category of Object.keys(ArticleCategoryEnum)) {
        const { articles, error } = await getArticlesByCategory(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])

        if (error) {
            return errorState;
        }

        articlesMap[ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum] as string] = articles || [];
    }

    return (
        <Layout>
            <CapsuleCreatorContainer articlesMap={articlesMap}/>
        </Layout>
    )
}