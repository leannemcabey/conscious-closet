'use server'
import Layout from "@/app/components/Layout";
import Image from "next/image";
import WeatherPageContainer from "@/app/components/articles/WeatherPageContainer";
import BackButton from "@/app/components/navigation/BackButton";
import { getArticlesByWeatherCategory } from "@/app/server-actions/article/getArticlesByWeatherCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function WeatherPage({ params }: { params: { id: string } }) {
    const { articles, error } = await getArticlesByWeatherCategory(params.id);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <BackButton />

            {error && <ErrorPageContainer errorMessage={errorMessage} />}

            {articles && (
                <div className="flex flex-col justify-center mt-4 text-2xl">
                    <Image src={`/${params.id}-weather-icon.svg`} height="75" width="75" alt={`${params.id} weather icon`} className="self-center mb-4" />

                    <WeatherPageContainer articles={articles} />
                </div>
            )}
        </Layout>
    )
};