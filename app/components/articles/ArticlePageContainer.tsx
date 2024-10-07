'use client'
import ArticleImage from "@/app/components/articles/ArticleImage";
import AddArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import AddOrRemoveFromTailoring from "@/app/components/needsTailoring/AddOrRemoveFromTailoring";
import AddOrRemoveFromCleanoutBag from "@/app/components/cleanoutBag/AddOrRemoveFromCleanoutBag";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import { Article } from "@/types/article";
import EditArticleModal from "@/app/components/articles/EditArticleModal";
import { useState } from "react";
import EditArticleButton from "@/app/components/articles/EditArticleButton";

interface ArticlePageContainerProps {
    article: Article;
}

const ArticlePageContainer = ({ article }: ArticlePageContainerProps) => {
    const [articleImageLoaded, setArticleImageLoaded] = useState<boolean>(false);

    return (
        <>
            {articleImageLoaded && (
                <div className="flex place-content-between items-center">
                    <div className="h-max flex space-x-2 mt-4">
                        <AddOrRemoveFromTailoring article={article}/>
                        <AddOrRemoveFromCleanoutBag article={article}/>
                    </div>

                    <div className="h-max flex space-x-2 mt-4">
                        <AddArticleToSuitcase article={article}/>
                        <EditArticleButton article={article} />
                        <DeleteArticle article={article}/>
                    </div>
                </div>
            )}

            <div className="flex justify-center items-center h-[80%] mt-12">
                <ArticleImage article={article} setArticleImageLoaded={setArticleImageLoaded} />
            </div>
        </>
    )
}

export default ArticlePageContainer;