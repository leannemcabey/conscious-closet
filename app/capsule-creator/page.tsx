'use server'
import Layout from "@/app/components/Layout";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import CapsuleCreatorContainer, {CategoryArticlesMap} from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import * as React from "react";
import { articleCategories } from "@/constants/articleCategories";

export default async function CapsuleCreator() {
    const errorState = (
        <Layout>
            <>
                <ErrorPageContainer errorMessage="An error occurred while retreiving your articles." />
            </>
        </Layout>
    )

    let articlesMap: CategoryArticlesMap = {};

    for (const category of articleCategories) {
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