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
        <div className="h-full flex flex-col items-center mt-[10%] space-y-[3%]">
            <div className="h-[80%]">
                <ArticleImage article={article}/>
            </div>

            <div className="flex w-[90%] max-w-[350px] justify-between">
                <div className="basis-[15%]">
                    <AddArticleToSuitcase article={article}/>
                </div>

                <div className="basis-[28%]">
                    <AddOrRemoveFromTailoring article={article}/>
                </div>

                <div className="basis-[28%]">
                    <AddOrRemoveFromCleanoutBag article={article}/>
                </div>

                <div className="basis-[15%]">
                    <DeleteArticle article={article}/>
                </div>
            </div>
        </div>
    )
}

export default ArticlePageContainer;