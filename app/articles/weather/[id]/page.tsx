'use server'
import Layout from "@/app/components/Layout";
import Image from "next/image";
import WeatherPageContainer from "@/app/components/articles/WeatherPageContainer";
import BackButton from "@/app/components/buttons/BackButton";
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
                <div className="flex flex-col justify-center mt-4 text-2xl h-[93%]">
                    <div className="self-center w-[60px] md:w-[80px]">
                        <Image
                            src={`/weather-icon-${params.id}.svg`}
                            height="60" width="60"
                            alt={`${params.id} weather icon`}
                            className="self-center mb-4 w-full"
                        />
                    </div>

                    <WeatherPageContainer articles={articles} />
                </div>
            )}
        </Layout>
    )
};