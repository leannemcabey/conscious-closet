'use server'
import Layout from "@/app/components/Layout";
import BackButton from "@/app/components/navigation/BackButton";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { getArticlesByCategory } from "@/app/server-actions/article/getArticlesByCategory";
import OutfitGeneratorContainer from "@/app/components/outfitGenerator/OutfitGeneratorContainer";
import { Article } from "@/types/article";

export default async function OutfitGenerator() {
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
            <BackButton />
            <OutfitGeneratorContainer articlesMap={articlesMap}/>
        </Layout>
    )
}