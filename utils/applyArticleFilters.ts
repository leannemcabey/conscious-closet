import { Article } from "@/types/Article";
import { FilterTypes } from "@/app/components/articles/filter/ArticleFilters";
import { FilterSettings } from "@/app/context/ArticleFilterContext";

export const applyArticleFilters = (
    articles: Article[],
    appliedFilters: FilterTypes[],
    filterSettings: FilterSettings
) => {
    let filteredArticles = articles;

    if (filterSettings.showCleanoutBagItems) filteredArticles = articles;
    if (!filterSettings.showCleanoutBagItems) filteredArticles = filteredArticles.filter((article) => !article.inCleanoutBag)

    if (appliedFilters.includes(FilterTypes.weather)) {
        const weatherCategoryIsSelected = (category) => filterSettings.selectedWeatherCategories?.includes(category);
        filteredArticles = filteredArticles.filter((article) => weatherCategoryIsSelected(article.weatherCategory))
    }

    if (appliedFilters.includes(FilterTypes.category)) {
        const articleCategoryIsSelected = (category) => filterSettings.selectedArticleCategories?.includes(category);
        filteredArticles = filteredArticles.filter((article) => articleCategoryIsSelected(article.articleCategory))
    }

    return filteredArticles;
}