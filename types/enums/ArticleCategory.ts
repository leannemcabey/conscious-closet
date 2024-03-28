// Values reflect the database enum. Also used for URL slugs.
export enum ArticleCategory {
    TOPS = "tops",
    BOTTOMS = "bottoms",
    DRESSES = "dresses",
    JUMPSUITS_ROMPERS = "jumpsuits_rompers",
    ACTIVEWEAR = "activewear",
    SHOES = "shoes",
    OUTERWEAR = "outerwear",
    ACCESSORIES = "accessories",
}

export enum ArticleCategoryTitles {
    TOPS = "Tops",
    BOTTOMS = "Bottoms",
    DRESSES = "Dresses",
    JUMPSUITS_ROMPERS = "Jumpsuits & Rompers",
    ACTIVEWEAR = "Activewear",
    SHOES = "Shoes",
    OUTERWEAR = "Outerwear",
    ACCESSORIES = "Accessories"
}

export const categoryTitleToPathSlug = (title: ArticleCategoryTitles): ArticleCategory => {
    return title.toLowerCase().replace(" & ", "_") as ArticleCategory
}