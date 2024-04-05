'use server'
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/Article";
import { slugToTitleMap } from "@/types/enums/ArticleCategory";
import Image from "next/image";
import Link from "next/link";

export default async function ArticleCategory({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('category', params.id);

    return (
        <Layout>
            <div className="text-center justify-center mt-4 text-2xl">
                <h1>{slugToTitleMap[params.id]}</h1>

                <div className="flex justify-center mt-8">
                    <Link href={`/articles/category/${params.id}/new`}>
                        <Image src="/plus-icon.svg" height="40" width="40" alt="plus icon" className="drop-shadow-lg"/>
                    </Link>

                    {articles && articles.map((article: Article) => <p>{article.image.baseUrl}</p>)}
                </div>
            </div>
        </Layout>
    )
};