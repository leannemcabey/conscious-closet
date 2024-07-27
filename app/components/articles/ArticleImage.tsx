'use client'
import { useEffect, useState } from "react";
import Polaroid from "@/app/components/articles/Polaroid";
import LastWorn from "@/app/components/articles/LastWorn";
import ArticleWeatherCategory from "@/app/components/articles/ArticleWeatherCategory";
import { Article } from "@/types/article";
import Image from "next/image";
import { updateGoogleUrl } from "@/app/googleService/client/updateGoogleUrl";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface ArticleImageProps {
    article: Article
}

const ArticleImage = ({ article }: ArticleImageProps) => {
    const [refreshedArticle, setRefreshedArticle] = useState<Article>();
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred when retrieving your article. Please go back and try again."

    useEffect(() => {
        updateGoogleUrl(article)
            .then((response) => {
                setRefreshedArticle(response)
                setError(false)
            })
            .catch((error) => {
                console.log(error)
                setError(true)
            })
    }, []);

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    if (!refreshedArticle && !error) return (
        <div className="flex justify-center h-4/5">
            <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin" />
        </div>
    )

    if (refreshedArticle) return (
        <div className="h-4/5">
            <Polaroid imageUrl={refreshedArticle.image.baseUrl} size="large">
                <LastWorn article={refreshedArticle}/>
                <ArticleWeatherCategory article={refreshedArticle} />
            </Polaroid>
        </div>
    )

}

export default ArticleImage;