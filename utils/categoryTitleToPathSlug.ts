import { ArticleCategoryEnum, ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";

export const categoryTitleToPathSlug = (title: ArticleCategoryTitle): ArticleCategoryEnum => {
    return title.toLowerCase().replace(" & ", "_") as ArticleCategoryEnum
}