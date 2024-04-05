'use server'
import Layout from "@/app/components/Layout";
import { WeatherPicker } from "@/app/components/newArticle/WeatherPicker";
import { CreateArticleButton } from "@/app/components/newArticle/CreateArticleButton";
import { NewArticleImageContainer } from "@/app/components/newArticle/NewArticleImageContainer";
import {slugToTitleMap} from "@/types/enums/ArticleCategory";

export default async function AddNewArticle({ params }: { params: { id: string } }) {
    return (
        <Layout>
            <div className="text-center justify-center mt-4 text-2xl">
                <h1>{slugToTitleMap[params.id]}</h1>
                <NewArticleImageContainer/>
                <WeatherPicker/>
                <CreateArticleButton/>
            </div>
        </Layout>
)
};