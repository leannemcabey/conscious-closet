'use client'
import { createClient } from '@/utils/supabase/client';
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/WeatherCategories";
import ArticleCategoryCard from "@/app/components/ArticleCategoryCard";
import {ARTICLE_CATEGORY_TITLES, ArticleCategoryTitles} from "@/types/enums/ArticleCategory";

export default function Home() {
    // const supabase = createClient();
    // supabase.auth.getSession()
    //     .then((user) => console.log(`inside home page: ${JSON.stringify(user)}`))


    // const { data: articleTypes } = await supabase.from("article_types").select();

    // console.log(JSON.stringify(articleTypes))

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
