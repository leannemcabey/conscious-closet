'use client'
import { createClient } from '@/utils/supabase/client';
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/WeatherCategories";
import ArticleTypeCard from "@/app/components/ArticleTypeCard";
import ArticleTypes from "@/app/components/ArticleTypes";

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
            <ArticleTypes>
                <ArticleTypeCard type="Tops" />
                <ArticleTypeCard type="Bottoms" />
                <ArticleTypeCard type="Dresses" />
                <ArticleTypeCard type="Jumpsuits & Rompers" />
                <ArticleTypeCard type="Shoes" />
                <ArticleTypeCard type="Outerwear" />
                <ArticleTypeCard type="Accessories" />
            </ArticleTypes>
            <LogoutButton/>
        </Layout>
    )
}