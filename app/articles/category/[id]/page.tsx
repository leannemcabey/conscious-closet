'use client'
import Layout from "@/app/components/Layout";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { GooglePhotoData } from "@/types/GooglePhotoData";
import AddNewArticleButton from "@/app/components/AddNewArticleButton";

export default function ArticleCategory({ params }: { params: { id: string } }) {
    const user = useUser();
    const [articlePhotos, setArticlePhotos] = useState<GooglePhotoData[]>([])
    const categoryHasArticles: boolean = articlePhotos.length > 0;

    return (
        <Layout>
            <div className="flex flex-col">
                <h1 className="mt-4 text-2xl">{params.id.toUpperCase()}</h1>
            </div>

            <div className="flex justify-center w-full mt-16">
                <AddNewArticleButton category={params.id}/>
            </div>
        </Layout>
    )
};