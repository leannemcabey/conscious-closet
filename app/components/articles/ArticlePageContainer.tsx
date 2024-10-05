'use client'
import ArticleImage from "@/app/components/articles/ArticleImage";
import AddArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import AddOrRemoveFromTailoring from "@/app/components/needsTailoring/AddOrRemoveFromTailoring";
import AddOrRemoveFromCleanoutBag from "@/app/components/cleanoutBag/AddOrRemoveFromCleanoutBag";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import { Article } from "@/types/article";
import UpdateArticleClassification from "@/app/components/articles/UpdateArticleClassification";
import { useState } from "react";

interface ArticlePageContainerProps {
    article: Article;
}

const ArticlePageContainer = ({ article }: ArticlePageContainerProps) => {
    const [articleImageLoaded, setArticleImageLoaded] = useState<boolean>(false);

    return (
        <>
            <div className="h-[97%] overflow-scroll flex flex-col justify-center items-center">
                {articleImageLoaded && <UpdateArticleClassification article={article}/>}

                <ArticleImage article={article} setArticleImageLoaded={setArticleImageLoaded} />

                {articleImageLoaded &&
                    <div className="flex mt-8 w-[80%] max-w-[350px] md:max-w-[400px] lg:max-w-[400px] justify-between">
                        <div>
                            <AddArticleToSuitcase article={article}/>
                        </div>

                        <div className="basis-[25%]">
                            <AddOrRemoveFromTailoring article={article}/>
                        </div>

                        <div className="basis-[25%]">
                            <AddOrRemoveFromCleanoutBag article={article}/>
                        </div>

                        <div>
                            <DeleteArticle article={article}/>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default ArticlePageContainer;