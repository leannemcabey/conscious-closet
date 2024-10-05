import ArticleImage from "@/app/components/articles/ArticleImage";
import AddArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import AddOrRemoveFromTailoring from "@/app/components/needsTailoring/AddOrRemoveFromTailoring";
import AddOrRemoveFromCleanoutBag from "@/app/components/cleanoutBag/AddOrRemoveFromCleanoutBag";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import { Article } from "@/types/article";
import ArticleWeatherCategory from "@/app/components/articles/ArticleWeatherCategory";
import Image from "next/image";
import UpdateArticleClassification from "@/app/components/articles/UpdateArticleClassification";

interface ArticlePageContainerProps {
    article: Article;
}

const ArticlePageContainer = ({ article }: ArticlePageContainerProps) => {
    return (
        <>
            <div className="h-[97%] overflow-scroll flex flex-col justify-center items-center">
                <UpdateArticleClassification article={article}/>
                <ArticleImage article={article}/>

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
            </div>

            {/*<div className="fixed right-0 bottom-[50%]">*/}
            {/*    <ArticleWeatherCategory article={article} />*/}
            {/*</div>*/}
        </>
    )
}

export default ArticlePageContainer;