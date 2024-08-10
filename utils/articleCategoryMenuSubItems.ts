import { MenuSubItem } from "@/app/components/navigation/MenuSubItemLink";
import { ArticleCategoryEnum, categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";

export const articleCategoryMenuSubItems = (): MenuSubItem[] => {
    return Object.values(ArticleCategoryEnum).map((category) => {
        return {
            label: categorySlugToTitleMap[category],
            linkTo: `/articles/category/${category}`
        }
    })
}