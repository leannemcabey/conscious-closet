import { Article } from "@/types/article";
import { FilterType } from "@/app/components/filter/ArticleFilters";
import { FilterSettings } from "@/app/context/ArticleFilterContext";
import {WeatherCategoryEnum} from "@/types/enums/weatherCategoryEnum";
import {ArticleCategoryEnum} from "@/types/enums/articleCategoryEnum";

export const applyArticleFilters = (
    articles: Article[],
    appliedFilters: FilterType[],
    filterSettings: FilterSettings
) => {
    let filteredArticles = articles;

    if (appliedFilters.includes(FilterType.cleanout)) {
        if (filterSettings.showCleanoutBagItems) filteredArticles = articles;
        if (!filterSettings.showCleanoutBagItems) filteredArticles = filteredArticles.filter((article) => !article.inCleanoutBag)
    }

    if (appliedFilters.includes(FilterType.weather)) {
        const weatherCategoryIsSelected = (category: WeatherCategoryEnum) => filterSettings.selectedWeatherCategories?.includes(category);
        filteredArticles = filteredArticles.filter((article) => weatherCategoryIsSelected(article.weatherCategory))
    }

    if (appliedFilters.includes(FilterType.category)) {
        const articleCategoryIsSelected = (category: ArticleCategoryEnum) => filterSettings.selectedArticleCategories?.includes(category);
        filteredArticles = filteredArticles.filter((article) => articleCategoryIsSelected(article.articleCategory))
    }

    return filteredArticles;
}