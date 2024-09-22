'use server'
import Layout from "@/app/components/Layout";
import Image from "next/image";
import WeatherPageContainer from "@/app/components/articles/WeatherPageContainer";
import { getArticlesByWeatherCategory } from "@/app/server-actions/article/getArticlesByWeatherCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import WeatherPageHeader from "@/app/components/WeatherPageHeader";

export default async function WeatherPage({ params }: { params: { id: string } }) {
    const { articles, error } = await getArticlesByWeatherCategory(params.id);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <div className="page-container">
                {error && <ErrorPageContainer errorMessage={errorMessage}/>}

                {articles && (
                    <>
                        <WeatherPageHeader
                            icon={`/weather-icon-${params.id}.svg`}
                            alt={`${params.id} weather icon`}
                        />

                        <WeatherPageContainer articles={articles}/>
                    </>
                )}
            </div>
        </Layout>
)
};