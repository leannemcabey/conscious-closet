import { createClient } from '@/utils/supabase/client';
import { LogoutButton } from "@/app/components/auth/LogoutButton";
import Layout from "@/app/components/Layout";
import WeatherCategories from "@/app/components/WeatherCategories";
import ArticleTypeCard from "@/app/components/ArticleTypeCard";
import ArticleTypes from "@/app/components/ArticleTypes";
import {UserProvider} from "@/app/components/providers/UserProvider";

export default function Home() {
    const supabase = createClient();
    // const { data: articleTypes } = await supabase.from("article_types").select();

    // console.log(JSON.stringify(articleTypes))

    return (
        <UserProvider>
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
        </UserProvider>
    )
}