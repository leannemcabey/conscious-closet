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
        <div className="flex flex-col items-center mt-12">
            <ArticleImage article={article}/>
            <div className="flex justify-center space-x-8 mt-16">
                <AddArticleToSuitcase article={article}/>
                <AddOrRemoveFromTailoring article={article}/>
                <AddOrRemoveFromCleanoutBag article={article}/>
                <DeleteArticle article={article}/>
            </div>
        </div>
    )
}

export default ArticlePageContainer;