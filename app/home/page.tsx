'use server'
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/home/WeatherCategories";
import ArticleCategoryCard from "@/app/components/home/ArticleCategoryCard";
import { ArticleCategoryTitles } from "@/types/enums/ArticleCategory";

export default async function Home() {
    return (
        <Layout>
            <div className="flex justify-center">
                <WeatherCategories />
            </div>
            <div className="mt-12 flex flex-col items-center justify-center space-y-5">
                {Object.values(ArticleCategoryTitles)
                    .map((title) => <ArticleCategoryCard title={title}/>)}
            </div>
            <LogoutButton/>
        </Layout>
    )
}
