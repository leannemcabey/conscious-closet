'use server'
import Layout from "@/app/components/Layout";
import { Article } from "@/types/article";
import { ArticleCategoryEnum, categorySlugToTitleMap}  from "@/types/enums/articleCategoryEnum";
import { toArticle } from "@/utils/conversions/toArticle";
import BackButton from "@/app/components/navigation/BackButton";
import CategoryPageContainer from "@/app/components/articles/CategoryPageContainer";
import { getAllArticlesInCategory } from "@/app/server-actions/article/getAllArticlesInCategory";

export default async function ArticleCategoryPage({ params }: { params: { id: string } }) {
    const data = await getAllArticlesInCategory(params.id);
    const mappedArticles: Article[] = data?.map((article) => toArticle(article)) ?? [];

    return (
        <Layout>
            <div className="h-full text-center justify-center mt-4 text-2xl">
                <BackButton />
                <h1 className="mb-8">{categorySlugToTitleMap[params.id]}</h1>

                <CategoryPageContainer articles={mappedArticles} category={params.id as ArticleCategoryEnum}/>
            </div>
        </Layout>
    )
};