'use server'
import Layout from "@/app/components/Layout";
import WeatherPageContainer from "@/app/components/articles/WeatherPageContainer";
import { getArticlesByWeatherCategory } from "@/app/server-actions/article/getArticlesByWeatherCategory";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import WeatherPageHeader from "@/app/components/WeatherPageHeader";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { getAllArticleExternalIds } from "@/app/server-actions/article/getAllArticleExternalIds";

export default async function WeatherPage({ params }: { params: { id: string } }) {
    const { articles, error } = await getArticlesByWeatherCategory(params.id);
    const allArticleExternalIds: Set<string> = await getAllArticleExternalIds();

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

                        <WeatherPageContainer articles={articles} weatherCategory={params.id as WeatherCategoryEnum} allArticleExternalIds={allArticleExternalIds}/>
                    </>
                )}
            </div>
        </Layout>
)
};