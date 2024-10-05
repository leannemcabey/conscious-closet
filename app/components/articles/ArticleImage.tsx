'use client'
import { useEffect, useState } from "react";
import Polaroid from "@/app/components/articles/Polaroid";
import LastWorn from "@/app/components/articles/LastWorn";
import ArticleWeatherCategory from "@/app/components/articles/ArticleWeatherCategory";
import { Article } from "@/types/article";
import Image from "next/image";
import { updateGoogleUrlWithRetry } from "@/app/googleService/client/updateGoogleUrl";
import ErrorModal from "@/app/components/modal/ErrorModal";
import { useRouter } from "next/navigation";

interface ArticleImageProps {
    article: Article
}

const ArticleImage = ({ article }: ArticleImageProps) => {
    const router = useRouter();
    const [refreshedArticle, setRefreshedArticle] = useState<Article>();
    const [error, setError] = useState<boolean>(false);
    // The `stopSpinner` state value is used so that when the error modal is closed, the loading spinner stops showing as well
    const [stopSpinner, setStopSpinner] = useState<boolean>();

    const errorMessage = "An error occurred when retrieving your article. Please go back and try again."

    useEffect(() => {
        updateGoogleUrlWithRetry(article, router)
            .then((response) => {
                if (response) {
                    setRefreshedArticle(response)
                    setError(false)
                }
            })
            .catch((error) => {
                console.log(error)
                setStopSpinner(true)
                setError(true)
            })
    }, []);

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    if (!refreshedArticle && !error && !stopSpinner) return (
        // the overflow-hidden is used because I think this gif may be slightly wider than there's room for at
        // the height it's set to, which is set to take up the same height as the image that will eventually load,
        // and there was a weird scrollbar flashing during loading
        <div className="flex justify-center h-[65%] overflow-hidden">
            <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin" />
        </div>
    )

    if (refreshedArticle) return (
        <div className="w-[95%] md:w-[50%] lg:w-[30%] space-y-4">
            <Polaroid imageUrl={refreshedArticle.image.baseUrl}>
                <LastWorn article={refreshedArticle}/>
            </Polaroid>

            {/*<ArticleWeatherCategory article={refreshedArticle} />*/}
        </div>
    )

}

export default ArticleImage;