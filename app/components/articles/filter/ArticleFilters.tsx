'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Article } from "@/types/Article";
import WeatherFilter from "@/app/components/articles/filter/WeatherFilter";
import CleanoutBagFilter from "@/app/components/articles/filter/CleanoutBagFilter";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import CategoryFilter from "@/app/components/articles/filter/CategoryFilter";
import { ArticleCategory } from "@/types/enums/ArticleCategory";

export enum FilterTypes {
    "cleanout",
    "weather",
    "category"
}

interface ArticleFiltersProps {
    articles: Article[]; // Represents all articles in this category
    setFilteredArticles: Dispatch<SetStateAction<Article[]>>;
    appliedFilters: FilterTypes[];
}

const ArticleFilters = ({ articles, setFilteredArticles, appliedFilters }: ArticleFiltersProps) => {
    // If the page does not allow filtering on the cleanout bag items, it means it's the cleanout bag page.
    // In this case, we want to show the cleanout bag items by default, in contrast to the other pages
    // where we hide them by default.
    const initialCleanoutStatus = !appliedFilters.includes(FilterTypes.cleanout)
    const [showCleanoutBagItems, setShowCleanoutBagItems] = useState<boolean>(initialCleanoutStatus);
    const [selectedWeatherCategories, setSelectedWeatherCategories] = useState<WeatherCategory[]>(
        [WeatherCategory.COLD, WeatherCategory.MIXED, WeatherCategory.WARM]
    )
    const [selectedArticleCategories, setSelectedArticleCategories] = useState<ArticleCategory[]>(
        [
            ArticleCategory.TOPS,
            ArticleCategory.BOTTOMS,
            ArticleCategory.JUMPSUITS_ROMPERS,
            ArticleCategory.ACTIVEWEAR,
            ArticleCategory.SHOES,
            ArticleCategory.OUTERWEAR,
            ArticleCategory.ACCESSORIES
        ]
    )

    useEffect(() => {
        let tempFilteredArticles = articles;

        if (showCleanoutBagItems) tempFilteredArticles = articles;
        if (!showCleanoutBagItems) tempFilteredArticles = tempFilteredArticles.filter((article) => !article.inCleanoutBag)
        tempFilteredArticles = tempFilteredArticles.filter((article) => weatherCategoryIsSelected(article.weatherCategory))
        tempFilteredArticles = tempFilteredArticles.filter((article) => articleCategoryIsSelected(article.articleCategory))

        setFilteredArticles(tempFilteredArticles)
    }, [showCleanoutBagItems, selectedWeatherCategories, selectedArticleCategories]);

    const weatherCategoryIsSelected = (category) => selectedWeatherCategories.includes(category);
    const articleCategoryIsSelected = (category) => selectedArticleCategories.includes(category);

    return (
        <div className="mb-4 px-1 py-2 flex place-content-between border border-theme-blue border-dotted rounded-md drop-shadow">
            {appliedFilters.includes(FilterTypes.cleanout) &&
                <CleanoutBagFilter showCleanoutBagItems={showCleanoutBagItems} setShowCleanoutBagItems={setShowCleanoutBagItems} />
            }

            {appliedFilters.includes(FilterTypes.weather) &&
                <WeatherFilter selectedWeatherCategories={selectedWeatherCategories} setSelectedWeatherCategories={setSelectedWeatherCategories} />
            }

            {appliedFilters.includes(FilterTypes.category) &&
                <CategoryFilter selectedArticleCategories={selectedArticleCategories} setSelectedArticleCategories={setSelectedArticleCategories} />
            }
        </div>
    )
}

export default ArticleFilters;