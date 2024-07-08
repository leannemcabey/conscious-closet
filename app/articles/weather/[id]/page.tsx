'use server'
import Layout from "@/app/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { Article } from "@/types/Article";
import { toArticle } from "@/utils/conversions/toArticle";
import Image from "next/image";
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import BackButton from "@/app/components/navigation/BackButton";
import ArticleFilters from "@/app/components/articles/filter/ArticleFilters";
import WeatherPageContainer from "@/app/components/articles/WeatherPageContainer";

export default async function WeatherPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const { data: articles } = await supabase.from("articles").select().eq('weather_category', params.id);
    const mappedArticles: Article[]= articles?.map((article) => toArticle(article)) ?? []

    return (
        <Layout>
            <div className="flex flex-col justify-center mt-4 text-2xl">
                <Image src={`/${params.id}-weather-icon.svg`} height="75" width="75" alt={`${params.id} weather icon`} className="self-center mb-4" />

                <WeatherPageContainer articles={mappedArticles} />
            </div>
        </Layout>
    )
};