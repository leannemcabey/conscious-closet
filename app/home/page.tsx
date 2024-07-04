'use server'
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/home/WeatherCategories";
import ArticleCategoryCard from "@/app/components/home/ArticleCategoryCard";
import { ArticleCategoryTitle } from "@/types/enums/ArticleCategory";

export default async function Home() {
    return (
        <Layout>
            <div className="flex justify-center">
                <WeatherCategories />
            </div>
            <div className="h-3/4 overflow-scroll">
                <div className="flex flex-col items-center justify-center mt-10 pb-1 space-y-5">
                    {Object.values(ArticleCategoryTitle)
                        .map((title) => <ArticleCategoryCard title={title} key={title}/>)}
                </div>
            </div>
        </Layout>
    )
}
