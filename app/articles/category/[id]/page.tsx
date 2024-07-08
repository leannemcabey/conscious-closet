'use server'
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/Article";
import { ArticleCategory, categorySlugToTitleMap}  from "@/types/enums/ArticleCategory";
import { toArticle } from "@/utils/conversions/toArticle";
import BackButton from "@/app/components/navigation/BackButton";
import CategoryPageContainer from "@/app/components/articles/CategoryPageContainer";

export default async function ArticleCategoryPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('category', params.id);
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];

    return (
        <Layout>
            <div className="h-full text-center justify-center mt-4 text-2xl">
                <BackButton />
                <h1 className="mb-8">{categorySlugToTitleMap[params.id]}</h1>

                <CategoryPageContainer articles={mappedArticles} category={params.id as ArticleCategory}/>
            </div>
        </Layout>
    )
};