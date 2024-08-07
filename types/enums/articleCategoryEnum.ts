// Values reflect the database enum. Also used for URL slugs.
import {MenuSubItem} from "@/app/components/navigation/MenuSubItemLink";

export enum ArticleCategoryEnum {
    TOPS = "tops",
    PANTS = "pants",
    SHORTS = "shorts",
    SKIRTS = "skirts",
    DRESSES = "dresses",
    JUMPSUITS_ROMPERS = "jumpsuits_rompers",
    ACTIVEWEAR = "activewear",
    SHOES = "shoes",
    OUTERWEAR = "outerwear",
    ACCESSORIES = "accessories",
}

export enum ArticleCategoryTitle {
    TOPS = "tops",
    PANTS = "pants",
    SHORTS = "shorts",
    SKIRTS = "skirts",
    DRESSES = "dresses",
    JUMPSUITS_ROMPERS = "jumpsuits & rompers",
    ACTIVEWEAR = "activewear",
    SHOES = "shoes",
    OUTERWEAR = "outerwear",
    ACCESSORIES = "accessories"
}

export const categorySlugToTitleMap  = {
    tops: "tops",
    pants: "pants",
    shorts: "shorts",
    skirts: "skirts",
    dresses: "dresses",
    jumpsuits_rompers: "jumpsuits & rompers",
    activewear: "activewear",
    shoes: "shoes",
    outerwear: "outerwear",
    accessories: "accessories"
}

export const categorySlugToSingularTitleMap = {
    tops: "top",
    pants: "pants",
    shorts: "shorts",
    skirts: "skirt",
    dresses: "dress",
    jumpsuits_rompers: "jumpsuit & romper",
    activewear: "activewear",
    shoes: "shoes",
    outerwear: "outerwear",
    accessories: "accessory"
}

export const categoryTitleToPathSlug = (title: ArticleCategoryTitle): ArticleCategoryEnum => {
    return title.toLowerCase().replace(" & ", "_") as ArticleCategoryEnum
}

export const articleCategoryMenuSubItems = (): MenuSubItem[] => {
    return Object.values(ArticleCategoryEnum).map((category) => {
        return {
            label: categorySlugToTitleMap[category],
            linkTo: `/articles/category/${category}`
        }
    })
}