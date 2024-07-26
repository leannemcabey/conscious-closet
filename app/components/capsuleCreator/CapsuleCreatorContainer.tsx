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

    const [selectedArticleIds, setSelectedArticleIds] = useState<string | undefined[]>([]);
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

    const updateSelectedArticles = (articleId: string | undefined, slot: number) => {
        console.log(`updating slot ${slot} with ${articleId}`)

        const tempSelectedArticleIds = [ ...selectedArticleIds ];
        tempSelectedArticleIds[slot] = articleId;
        setSelectedArticleIds(tempSelectedArticleIds)
    }

    //ultimately before sending to suitcase api action, dedupe the list

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

                <button
                    className="rounded-md bg-white border border-theme-light-green w-full py-1 mb-2 mt-1 drop-shadow text-theme-green"
                    onClick={() => console.log(selectedArticleIds.length)}
                >
                    + add capsule to a suitcase
                </button>

                <div className="h-3/5 grid grid-cols-2 place-content-between">
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={0} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={1} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={2} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={3} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.PANTS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={4} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.SKIRTS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={5} />
                </div>
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CapsuleCreatorContainer;