import { Article } from "@/types/article";

export const splitArticlesIntoBatches = (articles: Article[]): Article[][] => {
    // The maximum number of media items that can be retrieved in one call is 50.
    if (articles.length < 50) return [articles];

    const articleSubsections = [];

    let startingIndex = 0;
    let endingIndex = 49;

    while (endingIndex < articles.length) {
        articleSubsections.push(articles.slice(startingIndex, endingIndex));
        startingIndex += 50;
        endingIndex += 50;
    }

    return articleSubsections;
}