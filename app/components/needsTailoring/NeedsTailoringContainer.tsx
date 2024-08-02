'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import ArticleFilters, {FilterType} from "@/app/components/articles/filter/ArticleFilters";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";

interface NeedsTailoringContainerProps {
    articles: Article[]
}

const NeedsTailoringContainer = ({ articles }: NeedsTailoringContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: true,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM],
        selectedArticleCategories: Object.keys(ArticleCategoryEnum).map((category) => ArticleCategoryEnum[category])
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticles, setUnfilteredArticles] = useState<Article[]>(articles);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(unfilteredArticles);

    const filterTypes = [FilterType.weather, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col h-[87%] md:h-[90%]">
                <ArticleFilters filterTypes={filterTypes} />

                {filteredArticles.length > 0 && (
                    <div className="h-[90%] md:h-[85%] pb-4">
                        <ArticlesContainer articles={filteredArticles} />
                    </div>
                )}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles needing tailoring that match the applied filters.
                    </p>
                }
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default NeedsTailoringContainer;