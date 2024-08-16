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
        <div className="h-[90%] flex flex-col items-center place-content-between space-y-4 mt-[5%] pb-[5%] md:mt-0 lg:mt-0">
            <ArticleImage article={article}/>

            <div className="flex w-[97%] max-w-[350px] md:max-w-[400px] lg:max-w-[400px] justify-between">
                <div className="basis-[15%]">
                    <AddArticleToSuitcase article={article}/>
                </div>

                <div className="basis-[25%]">
                    <AddOrRemoveFromTailoring article={article}/>
                </div>

                <div className="basis-[25%]">
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