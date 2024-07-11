'use client'
import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import { Article } from "@/types/Article";
import WeatherFilter from "@/app/components/articles/filter/WeatherFilter";
import CleanoutBagFilter from "@/app/components/articles/filter/CleanoutBagFilter";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import CategoryFilter from "@/app/components/articles/filter/CategoryFilter";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import {ArticleFilterContext} from "@/app/context/ArticleFilterContext";

export enum FilterTypes {
    "cleanout",
    "weather",
    "category"
}

interface ArticleFiltersProps {
    articles: Article[]; // Represents all articles in this category, unfiltered
    setFilteredArticles: Dispatch<SetStateAction<Article[]>>;
    filterTypes: FilterTypes[];
}

const ArticleFilters = ({ articles, setFilteredArticles, filterTypes }: ArticleFiltersProps) => {
    const { filterSettings, setFilterSettings } = useContext(ArticleFilterContext);
    const [showCleanoutBagItems, setShowCleanoutBagItems] = useState<boolean>(filterSettings.showCleanoutBagItems);
    const [selectedWeatherCategories, setSelectedWeatherCategories] = useState<WeatherCategory[]>(filterSettings.selectedWeatherCategories);
    const [selectedArticleCategories, setSelectedArticleCategories] = useState<ArticleCategory[]>(filterSettings.selectedArticleCategories);

    useEffect(() => {
        console.log('use effect in articlefilters running')
        console.log(selectedWeatherCategories)

        let tempFilteredArticles = articles;

        if (showCleanoutBagItems) tempFilteredArticles = articles;
        if (!showCleanoutBagItems) tempFilteredArticles = tempFilteredArticles.filter((article) => !article.inCleanoutBag)
        tempFilteredArticles = tempFilteredArticles.filter((article) => weatherCategoryIsSelected(article.weatherCategory))
        tempFilteredArticles = tempFilteredArticles.filter((article) => articleCategoryIsSelected(article.articleCategory))

        console.log(`filtered: ${tempFilteredArticles.length}`)

        setFilterSettings({
            showCleanoutBagItems: showCleanoutBagItems,
            selectedWeatherCategories: selectedWeatherCategories,
            selectedArticleCategories: selectedArticleCategories
        });
        setFilteredArticles(tempFilteredArticles);
    }, [articles, showCleanoutBagItems, selectedWeatherCategories, selectedArticleCategories]);

    const weatherCategoryIsSelected = (category) => selectedWeatherCategories?.includes(category);
    const articleCategoryIsSelected = (category) => selectedArticleCategories?.includes(category);

    // const context: FilterSettings = {
    //     showCleanoutBagItems: showCleanoutBagItems,
    //     selectedWeatherCategories: selectedWeatherCategories,
    //     selectedArticleCategories: selectedArticleCategories
    // }

    return (
        <div className="mb-4 px-1 py-2 flex place-content-between border border-theme-blue border-dotted rounded-md drop-shadow">
            {filterTypes.includes(FilterTypes.cleanout) &&
                <CleanoutBagFilter showCleanoutBagItems={showCleanoutBagItems} setShowCleanoutBagItems={setShowCleanoutBagItems} />
            }

            {filterTypes.includes(FilterTypes.weather) &&
                <WeatherFilter selectedWeatherCategories={selectedWeatherCategories} setSelectedWeatherCategories={setSelectedWeatherCategories} />
            }

            {filterTypes.includes(FilterTypes.category) &&
                <CategoryFilter selectedArticleCategories={selectedArticleCategories} setSelectedArticleCategories={setSelectedArticleCategories} />
            }
        </div>
    )
}

export default ArticleFilters;