// Values reflect the database enum. Also used for URL slugs.
export enum ArticleCategoryEnum {
    TOPS = "tops",
    BOTTOMS = "bottoms",
    DRESSES = "dresses",
    JUMPSUITS_ROMPERS = "jumpsuits_rompers",
    ACTIVEWEAR = "activewear",
    SHOES = "shoes",
    OUTERWEAR = "outerwear",
    ACCESSORIES = "accessories",
}

export enum ArticleCategoryTitle {
    TOPS = "tops",
    BOTTOMS = "bottoms",
    DRESSES = "dresses",
    JUMPSUITS_ROMPERS = "jumpsuits & rompers",
    ACTIVEWEAR = "activewear",
    SHOES = "shoes",
    OUTERWEAR = "outerwear",
    ACCESSORIES = "accessories"
}

export const categorySlugToTitleMap  = {
    tops: "tops",
    bottoms: "bottoms",
    dresses: "dresses",
    jumpsuits_rompers: "jumpsuits & rompers",
    activewear: "activewear",
    shoes: "shoes",
    outerwear: "outerwear",
    accessories: "accessories"
}

export const categorySlugToSingularTitleMap = {
    tops: "top",
    bottoms: "bottom",
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