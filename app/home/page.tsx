'use server'
import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/home/WeatherCategories";
import ArticleCategoryCard from "@/app/components/home/ArticleCategoryCard";
import { ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";

export default async function Home() {
    return (
        <Layout>
            <div className="flex justify-center">
                <WeatherCategories />
            </div>
            <div className="h-4/5 overflow-scroll">
                <div className="flex flex-col items-center justify-center my-4 space-y-5">
                    {Object.values(ArticleCategoryTitle)
                        .map((title) => <ArticleCategoryCard title={title} key={title}/>)}
                </div>
            </div>
        </Layout>
    )
}
