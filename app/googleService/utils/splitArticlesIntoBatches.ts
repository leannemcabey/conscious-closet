import { Article } from "@/types/article";

export const splitArticlesIntoBatches = (articles: Article[]): Article[][] => {
    console.log(`splitting articles`)
    // The maximum number of media items that can be retrieved in one call is 50.
    if (articles.length <= 50) return [articles];

    const articleSubsections = [];

    let startingIndex = 0;
    let endingIndex = 50; // the below slice is non-inclusive of end index

    while (endingIndex <= articles.length) {
        articleSubsections.push(articles.slice(startingIndex, endingIndex));

        if (endingIndex === articles.length) break;
        startingIndex += 50;
        endingIndex = endingIndex + 50 < articles.length ? endingIndex + 50 : articles.length;
    }

    return articleSubsections;
}