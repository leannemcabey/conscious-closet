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
import AddCapsuleToSuitcase from "@/app/components/capsuleCreator/AddCapsuleToSuitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";

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

    const [selectedArticleIds, setSelectedArticleIds] = useState<(string | undefined)[]>([]);
    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticlesMap, setUnfilteredArticlesMap] = useState<CategoryArticlesMap>(articlesMap)
    const [filteredArticlesMap, setFilteredArticlesMap] = useState<CategoryArticlesMap>(articlesMap);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    const filterTypes= [FilterType.cleanout, FilterType.weather];

    useEffect(() => {
        let tempFilteredArticlesMap: CategoryArticlesMap = { ...unfilteredArticlesMap };

        Object.keys(tempFilteredArticlesMap).forEach((category) => {
            tempFilteredArticlesMap[category] = applyArticleFilters(unfilteredArticlesMap[category], filterTypes, filterSettings);
        })

        setFilteredArticlesMap(tempFilteredArticlesMap)
    }, [unfilteredArticlesMap, filterSettings]);

    const updateSelectedArticles = (articleId: string | undefined, slot: number) => {
        const tempSelectedArticleIds = [ ...selectedArticleIds ];
        tempSelectedArticleIds[slot] = articleId;
        setSelectedArticleIds(tempSelectedArticleIds)
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="h-[95%] flex flex-col">
                <div className="flex justify-center mb-4">
                    <h1 className="text-lg mr-2 md:text-3xl">capsule creator</h1>
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

                <AddCapsuleToSuitcase selectedArticleIds={selectedArticleIds}/>

                <div className="h-[78%] md:h-[83%] grid grid-cols-2 md:grid-cols-3 pb-4">
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={0} setError={setError} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={1} setError={setError} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={2} setError={setError} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={3} setError={setError} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.PANTS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={4} setError={setError} />
                    <CapsuleElement defaultArticleType={ArticleCategoryEnum.SKIRTS} articlesMap={filteredArticlesMap} updateSelectedArticles={updateSelectedArticles} slot={5} setError={setError} />
                </div>
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CapsuleCreatorContainer;