'use server'
import { createClient } from "@/utils/supabase/server";
import { toArticle } from "@/utils/typeConversions/toArticle";

export async function getSuitcaseArticles(suitcaseId: string) {
    const supabase = createClient();

    const { data, error: fetchArticleIdsError } = await supabase
        .from('suitcase_articles')
        .select('article_id')
        .eq('suitcase_id', suitcaseId)

    const articleIds: string[] = data?.map((articleId) => articleId.article_id) ?? []

    const { data: articles, error: fetchArticlesError } = await supabase
        .from('articles')
        .select()
        .in('id', articleIds)

    return {
        articles: articles?.map((article) => toArticle(article)),
        error: fetchArticleIdsError || fetchArticlesError
    }
}