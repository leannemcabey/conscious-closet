'use server'
import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/buttons/BackButton";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import CapsuleCreatorContainer from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import { Article } from "@/types/article";
import * as React from "react";

export default async function CapsuleCreator() {
    const errorState = (
        <Layout>
            <BackButton />
            <ErrorPageContainer errorMessage="An error occurred while retreiving your articles." />
        </Layout>
    )

    const buildCategoryArticlesMap = async (): Promise<Map<string, Article[]>> => {
        let articlesMap = new Map<string, Article[]>();

        for (const category of Object.keys(ArticleCategoryEnum)) {
            const { articles, error } = await getArticlesByCategory(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])

            console.log(`articles: ${JSON.stringify(articles)}`)

            if (error) {
                throw error;
            }

            articlesMap.set(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum], articles || [])
            console.log(`inside block: ${JSON.stringify(articlesMap)}`)
        }

        console.log(`about to return articlesMap: ${JSON.stringify(articlesMap)}`)
        return articlesMap;
    }

    let articlesMap;
    try {
        articlesMap = await buildCategoryArticlesMap().then((response) => response);
    } catch {
        return errorState;
    }

    // let articlesMap = new Map<string, Article[]>();
    // for (const category of Object.keys(ArticleCategoryEnum)) {
    //     const { articles, error } = await getArticlesByCategory(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])
    //
    //     console.log(`articles: ${JSON.stringify(articles)}`)
    //
    //     if (error) {
    //         return errorState;
    //     }
    //
    //     articlesMap.set(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum], articles || [])
    //     console.log(`inside block: ${JSON.stringify(articlesMap)}`)
    // }


    return (
        <Layout>
            <CapsuleCreatorContainer articlesMap={articlesMap}/>
        </Layout>
    )
}