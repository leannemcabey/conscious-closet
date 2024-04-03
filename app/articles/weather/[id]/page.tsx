'use client'
import Layout from "@/app/components/Layout";
import { useState } from "react";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";

export default function Weather({ params }: { params: { id: string } }) {
    const [articlePhotos, setArticlePhotos] = useState<GooglePhotoMetadata[]>([])
    const categoryHasArticles: boolean = articlePhotos.length > 0;

    return (
        <Layout>
            <div className="flex flex-col">
                <h1 className="mt-4 text-2xl">{params.id.toUpperCase()}</h1>
            </div>
        </Layout>
    )
};