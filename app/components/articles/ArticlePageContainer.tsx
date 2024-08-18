import ArticleImage from "@/app/components/articles/ArticleImage";
import AddArticleToSuitcase from "@/app/components/suitcases/AddArticleToSuitcase";
import AddOrRemoveFromTailoring from "@/app/components/needsTailoring/AddOrRemoveFromTailoring";
import AddOrRemoveFromCleanoutBag from "@/app/components/cleanoutBag/AddOrRemoveFromCleanoutBag";
import DeleteArticle from "@/app/components/articles/DeleteArticle";
import { Article } from "@/types/article";

interface ArticlePageContainerProps {
    article: Article;
}

const ArticlePageContainer = ({ article }: ArticlePageContainerProps) => {
    return (
        <div className="h-[97%] overflow-scroll flex flex-col items-center place-content-between space-y-4 mt-4 pb-4 md:pb-8">
            <ArticleImage article={article}/>

            <div className="flex w-[97%] max-w-[350px] md:max-w-[400px] lg:max-w-[400px] justify-between">
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
    )
}

export default ArticlePageContainer;