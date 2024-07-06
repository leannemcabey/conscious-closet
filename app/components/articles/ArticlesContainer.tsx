'use client'
import { Article } from "@/types/Article";
import ArticleImageLink from "@/app/components/articles/ArticleImageLinkCard";
import { useEffect, useState } from "react";
import { refreshGooglePhotosBaseUrls } from "@/utils/refreshGooglePhotosBaseUrls";

interface ArticlesContainerProps {
    articles: Article[];
}

const ArticlesContainer = ({ articles }: ArticlesContainerProps) => {
    console.log('rendering articlescontainers')
    // const [staleArticles]
    const [refreshedArticles, setRefreshedArticles] = useState<Article[]>();

    useEffect(() => {
        console.log('use effect running')
        if (articles.length > 0) {
            // This calls the `setRefreshedArticles` function
            refreshGooglePhotosBaseUrls(articles, setRefreshedArticles);
        }
    }, [articles]);


    return (
        <div className="h-full grid grid-cols-3 gap-x-2 gap-y-2 p-2 rounded-md">
            {/*
                Checking articles.length is a workaround to handle when all articles in the cleanout bag have been
                deleted. In that scenario, `useEffect` doesn't rerun and therefore `refreshedArticles` becomes stale
                (ironic). However, the `articles` prop is fresh, because it is a state value in its parent component
                that gets updated when the articles are deleted. So we can use this to check if there's anything to
                render here.
            */}
            {articles.length > 0 && refreshedArticles?.map((article) => (
                <ArticleImageLink article={article} key={article.id}/>
            ))}
        </div>
    )
}

export default ArticlesContainer;