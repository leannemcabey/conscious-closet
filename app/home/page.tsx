import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/home/WeatherCategories";
import ArticleCategoryCard from "@/app/components/home/ArticleCategoryCard";
import { ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";

// This forces the PWA to load this page dynamically. Without doing this, I believe the build was breaking.
export const dynamic = 'force-dynamic';

export default async function Home() {
    return (
        <Layout>
            <>
                <div className="flex justify-center place-content-around">
                    <WeatherCategories />
                </div>
                <div className="h-[87%] grid grid-cols-1 overflow-scroll mt-2 pb-2 md:h-[87%]">
                    <div className="flex flex-col w-full items-center justify-center space-y-2">
                        {Object.values(ArticleCategoryTitle)
                            .map((title) => <ArticleCategoryCard title={title} key={title}/>)}
                    </div>
                </div>
            </>
        </Layout>
    )
}
