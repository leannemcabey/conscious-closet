'use server'
import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/buttons/BackButton";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import CapsuleCreatorContainer from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import { Article } from "@/types/article";
import Image from "next/image";
import * as React from "react";
import PageHeader from "@/app/components/PageHeader";

export default async function CapsuleCreator() {
    const errorState = (
        <Layout>
            <BackButton />
            <ErrorPageContainer errorMessage="An error occurred while retreiving your articles." />
        </Layout>
    )

    let articlesMap: { string: Article[] } = {};


    for (const category of Object.keys(ArticleCategoryEnum)) {
        const { articles, error } = await getArticlesByCategory(ArticleCategoryEnum[category])

        if (error) {
            return errorState;
        }

        articlesMap[ArticleCategoryEnum[category]] = articles || [];
    }

    return (
        <Layout>
            <BackButton/>
            <PageHeader title="capsule creator" iconPath="/lightbulb.svg" iconAlt="light bulb icon" />
            <CapsuleCreatorContainer articlesMap={articlesMap}/>
        </Layout>
    )
}