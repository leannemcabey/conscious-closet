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
            <ArticleImage article={article}/>
            <div className="flex w-[90%] justify-between">
                <AddArticleToSuitcase article={article}/>
                <AddOrRemoveFromTailoring article={article}/>
                <AddOrRemoveFromCleanoutBag article={article}/>
                <DeleteArticle article={article}/>
            </div>
        </div>
    )
}

export default ArticlePageContainer;