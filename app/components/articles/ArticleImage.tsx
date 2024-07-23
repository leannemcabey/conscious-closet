'use client'
import { useEffect, useState } from "react";
import Polaroid from "@/app/components/articles/Polaroid";
import LastWorn from "@/app/components/articles/LastWorn";
import ArticleWeatherCategory from "@/app/components/articles/ArticleWeatherCategory";
import { Article } from "@/types/article";
import Image from "next/image";
import { updateGoogleUrl } from "@/app/googleService/client/updateGoogleUrl";

interface ArticleImageProps {
    article: Article
}

const ArticleImage = ({ article }: ArticleImageProps) => {
    const [refreshedArticle, setRefreshedArticle] = useState<Article>();

    useEffect(() => {
        updateGoogleUrl(article)
            .then((response) => setRefreshedArticle(response))
    }, []);

    if (!refreshedArticle) return (
        <div className="flex justify-center h-[583px]">
            <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin" />
        </div>
    )

    if (refreshedArticle) return (
        <div className="h-[583px]">
            <Polaroid imageUrl={refreshedArticle.image.baseUrl} size="large">
                <LastWorn article={refreshedArticle}/>
                <ArticleWeatherCategory article={refreshedArticle} />
            </Polaroid>
        </div>
    )

}

export default ArticleImage;