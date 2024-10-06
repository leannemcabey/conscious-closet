'use client'
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import Polaroid from "@/app/components/articles/Polaroid";
import Link from "next/link";
import Image from "next/image";
import { batchUpdateGoogleUrlsWithRetry } from "@/app/googleService/client/batchUpdateGoogleUrlsWithRetry";
import ErrorModal from "@/app/components/modal/ErrorModal";
import { useRouter } from "next/navigation";

interface ArticlesContainerProps {
    articles: Article[];
}

const ArticlesContainer = ({ articles }: ArticlesContainerProps) => {
    const router = useRouter();
    const [refreshedArticles, setRefreshedArticles] = useState<Article[]>();
    const [error, setError] = useState<boolean>(false);
    // The `stopSpinner` state value is used so that when the error modal is closed, the loading spinner stops showing as well
    const [stopSpinner, setStopSpinner] = useState<boolean>();

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    useEffect(() => {
        if (articles.length > 0) {
            batchUpdateGoogleUrlsWithRetry(articles, router)
                .then((articles) => {
                    setRefreshedArticles(articles)
                    setError(false)
                })
                .catch(() => {
                    setStopSpinner(true)
                    setError(true)
                })
        }
    }, [articles]);


    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    if (!refreshedArticles && !error && !stopSpinner) return (
        <div className="flex justify-center h-[450px]">
            <Image src={`/loading.svg`} height="150" width="150" alt="loading" className="animate-spin"/>
        </div>
    )

    if (refreshedArticles) return (
        <div className="pb-10 overflow-scroll">
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2 pb-2 justify-items-center">
                {/*
                    Checking articles.length is a workaround to handle when all articles in the cleanout bag have been
                    deleted. In that scenario, `useEffect` doesn't rerun and therefore `refreshedArticles` becomes stale
                    (ironic). However, the `articles` prop is fresh, because it is a state value in its parent component
                    that gets updated when the articles are deleted. So we can use this to check if there's anything to
                    render here.
                */}
                {articles.length > 0 && refreshedArticles?.map((article) => {
                    return (
                        <Link href={`/articles/${article.id}`} key={article.id}>
                            <Polaroid imageUrl={article.image.baseUrl} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default ArticlesContainer;