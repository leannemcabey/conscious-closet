'use server'
import Layout from "@/app/components/Layout";
import AddNewArticleButton from "@/app/components/articles/AddNewArticleButton";
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/Article";

export default async function ArticleCategory({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('category', params.id);

    return (
        <Layout>
            <div className="flex flex-col">
                <h1 className="mt-4 text-2xl">{params.id.toUpperCase()}</h1>
            </div>

            <div className="flex justify-center w-full mt-16">
                <AddNewArticleButton category={params.id}/>
                {articles && articles.map((article: Article) => <p>{article.image.baseUrl}</p>)}
            </div>
        </Layout>
    )
};