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
        <div className="h-[90%] md:h-[80%] flex flex-col items-center place-content-between space-y-4 mt-[5%] py-[5%] md:mx-[10%] md:border md:border-double md:border-[10px] md:border-neutral-500 md:rounded-2xl">
            {/*<div className="h-[80%]">*/}
                <ArticleImage article={article}/>
            {/*</div>*/}

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