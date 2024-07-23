'use client'
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import Polaroid from "@/app/components/articles/Polaroid";
import Link from "next/link";
import Image from "next/image";
import { batchUpdateGoogleUrls } from "@/app/googleService/client/batchUpdateGoogleUrls";

interface ArticlesContainerProps {
    articles: Article[];
    headerSize: "small" | "large"
}

const ArticlesContainer = ({ articles, headerSize }: ArticlesContainerProps) => {
    const [refreshedArticles, setRefreshedArticles] = useState<Article[]>();

    useEffect(() => {
        if (articles.length > 0) {
            batchUpdateGoogleUrls(articles)
                .then((articles) => setRefreshedArticles(articles))
        }
    }, [articles]);

    const height = headerSize === "small" ? "h-2/3" : "h-3/5";

    if (!refreshedArticles) return (
        <div className="flex justify-center h-[450px]">
            <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin"/>
        </div>
    )

    if (refreshedArticles) return (
        <div className="h-screen">
            <div className={`${height} overflow-scroll`}>
                <div className="grid grid-cols-3 gap-x-2 gap-y-2 p-2 rounded-md justify-items-center">
                    {/*
                        Checking articles.length is a workaround to handle when all articles in the cleanout bag have been
                        deleted. In that scenario, `useEffect` doesn't rerun and therefore `refreshedArticles` becomes stale
                        (ironic). However, the `articles` prop is fresh, because it is a state value in its parent component
                        that gets updated when the articles are deleted. So we can use this to check if there's anything to
                        render here.
                    */}
                    {articles.length > 0 && refreshedArticles?.map((article) => (
                        <Link href={`/articles/${article.id}`} key={article.id}>
                            <Polaroid imageUrl={article.image.baseUrl} size="small" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ArticlesContainer;