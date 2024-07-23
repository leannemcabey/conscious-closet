import { Article } from "@/types/article";

export const buildParams = (articles: Article[]): URLSearchParams => {
    const params = new URLSearchParams();
    articles.forEach((article) => params.append("mediaItemIds", article.image.imageId));
    return params;
};