'use server'
import Layout from "@/app/components/Layout";
import { WeatherPicker } from "@/app/components/newArticle/WeatherPicker";
import { CreateArticleButton } from "@/app/components/newArticle/CreateArticleButton";
import { NewArticleImageContainer } from "@/app/components/newArticle/NewArticleImageContainer";

export default async function AddNewArticle({ params }: { params: { id: string } }) {
    return (
        <Layout>
            <h1 className="mt-4 text-2xl"> > {params.id.toUpperCase()}</h1>
            <NewArticleImageContainer />
            <WeatherPicker />
            <CreateArticleButton />
        </Layout>
    )
};