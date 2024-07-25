'use client'
import Image from "next/image";
import * as React from "react";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import ArticleFilters, { FilterType } from "@/app/components/articles/filter/ArticleFilters";
import { applyArticleFilters } from "@/utils/applyArticleFilters";

interface CategoryArticlesMap {
    string: Article[]
}

interface CapsuleCreatorContainerProps {
    articlesMap: CategoryArticlesMap
}

const CapsuleCreatorContainer = ({ articlesMap }: CapsuleCreatorContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticlesMap, setUnfilteredArticlesMap] = useState<CategoryArticlesMap>(articlesMap)
    const [filteredArticlesMap, setFilteredArticlesMap] = useState<CategoryArticlesMap>(articlesMap);

    const filterTypes= [FilterType.cleanout, FilterType.weather];

    useEffect(() => {
        let tempFilteredArticlesMap: CategoryArticlesMap = { ...unfilteredArticlesMap };

        Object.keys(tempFilteredArticlesMap).forEach((category) => {
            tempFilteredArticlesMap[category] = applyArticleFilters(unfilteredArticlesMap[category], filterTypes, filterSettings);
        })

        setFilteredArticlesMap(tempFilteredArticlesMap)
    }, [unfilteredArticlesMap, filterSettings]);

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="h-full">
                <div className="flex justify-center mb-4">
                    <h1 className="text-2xl mr-2">capsule creator</h1>
                    <div>
                        <Image
                            src={"/lightbulb.svg"}
                            alt={"light bulb icon"}
                            width="30"
                            height="30"
                        />
                    </div>
                </div>

                <ArticleFilters filterTypes={filterTypes} />

                <div className="h-4/5 grid grid-cols-2 place-content-between">
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.OUTERWEAR} articlesMap={filteredArticlesMap} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.PANTS} articlesMap={filteredArticlesMap} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.ACCESSORIES} articlesMap={filteredArticlesMap} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.SHOES} articlesMap={filteredArticlesMap} />
                </div>
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CapsuleCreatorContainer;