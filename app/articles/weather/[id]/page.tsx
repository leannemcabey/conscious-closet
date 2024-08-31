'use server'
import Layout from "@/app/components/Layout";
import Image from "next/image";
import WeatherPageContainer from "@/app/components/articles/WeatherPageContainer";
import { getArticlesByWeatherCategory } from "@/app/server-actions/article/getArticlesByWeatherCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";

export default async function WeatherPage({ params }: { params: { id: string } }) {
    const { articles, error } = await getArticlesByWeatherCategory(params.id);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    return (
        <Layout>
            <>
                {error && <ErrorPageContainer errorMessage={errorMessage} />}

                {articles && (
                    <div className="h-full flex flex-col justify-center text-2xl -mt-1 md:mt-0 lg:mt-1">
                        <div className="self-center w-[40px] md:w-[50px]">
                            <Image
                                src={`/weather-icon-${params.id}.svg`}
                                height="60"
                                width="60"
                                alt={`${params.id} weather icon`}
                                className="self-center w-full mb-1"
                            />
                        </div>

                        <WeatherPageContainer articles={articles} />
                    </div>
                )}
            </>
        </Layout>
    )
};