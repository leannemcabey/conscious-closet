'use server'
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/Article";
import { categorySlugToTitleMap } from "@/types/enums/ArticleCategory";
import Image from "next/image";
import Link from "next/link";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import { toArticle } from "@/utils/conversions/toArticle";
import BackButton from "@/app/components/navigation/BackButton";

export default async function ArticleCategoryPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('category', params.id);
    const mappedArticles: Article[] = articles?.map((article) => toArticle(article)) ?? [];

    return (
        <Layout>
            <div className="text-center justify-center mt-4 text-2xl">
                <BackButton />
                <h1>{categorySlugToTitleMap[params.id]}</h1>

                <div className="flex flex-col mt-8">
                    <Link href={`/articles/category/${params.id}/new`} className="self-center mb-6">
                        <Image src="/plus-icon.svg" height="40" width="40" alt="plus icon" className="drop-shadow-lg"/>
                    </Link>

                    <ArticlesContainer articles={mappedArticles} />
                </div>
            </div>
        </Layout>
    )
};