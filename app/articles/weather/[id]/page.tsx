'use server'
import Layout from "@/app/components/Layout";
import Image from "next/image";
import WeatherPageContainer from "@/app/components/articles/WeatherPageContainer";
import BackButton from "@/app/components/navigation/BackButton";
import { getArticlesByWeatherCategory } from "@/app/server-actions/article/getArticlesByWeatherCategory";

export default async function WeatherPage({ params }: { params: { id: string } }) {
    const articles = await getArticlesByWeatherCategory(params.id);

    return (
        <Layout>
            <BackButton />
            <div className="flex flex-col justify-center mt-4 text-2xl">
                <Image src={`/${params.id}-weather-icon.svg`} height="75" width="75" alt={`${params.id} weather icon`} className="self-center mb-4" />

                <WeatherPageContainer articles={articles} />
            </div>
        </Layout>
    )
};