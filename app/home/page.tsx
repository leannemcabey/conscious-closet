import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/home/WeatherCategories";
import ArticleCategoryCard from "@/app/components/home/ArticleCategoryCard";
import { ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";

export const dynamic = 'force-dynamic';

export default async function Home() {
    return (
        <Layout>
            <>
                <div className="flex justify-center">
                    <WeatherCategories />
                </div>
                <div className="h-4/5 overflow-scroll mt-2 pb-8 place-content-around md:h-[87%]">
                    <div className="flex flex-col w-full items-center justify-center space-y-5">
                        {Object.values(ArticleCategoryTitle)
                            .map((title) => <ArticleCategoryCard title={title} key={title}/>)}
                    </div>
                </div>
            </>
        </Layout>
    )
}
