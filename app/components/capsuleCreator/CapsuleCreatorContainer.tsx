'use client'
import * as React from "react";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import ArticleFilters, { FilterType } from "@/app/components/filter/ArticleFilters";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import AddCapsuleToSuitcase from "@/app/components/capsuleCreator/AddCapsuleToSuitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";
import PageHeader from "@/app/components/PageHeader";
import CapsuleElementsContainer from "@/app/components/capsuleCreator/CapsuleElementsContainer";
import { defaultCapsuleElements } from "@/app/components/capsuleCreator/utils/defaultCapsuleElements";
import { CapsuleElementsMapType } from "@/types/CapsuleElementsMapType";

export type CategoryArticlesMap = Record<string, Article[]>

interface CapsuleCreatorContainerProps {
    articlesMap: CategoryArticlesMap;
}

const CapsuleCreatorContainer = ({ articlesMap }: CapsuleCreatorContainerProps) => {
    const filterCleanout = (): CategoryArticlesMap => {
        const articlesNotInCleanoutMap: CategoryArticlesMap = {};

        Object.keys(unfilteredArticlesMap).forEach((category) => {
            articlesNotInCleanoutMap[category] = unfilteredArticlesMap[category].filter((article) => !article.inCleanoutBag)
        })

        return articlesNotInCleanoutMap as CategoryArticlesMap;
    }

    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticlesMap, setUnfilteredArticlesMap] = useState<CategoryArticlesMap>(articlesMap)
    const articlesNotInCleanoutMap = filterCleanout();
    const [filteredArticlesMap, setFilteredArticlesMap] = useState<CategoryArticlesMap>(articlesNotInCleanoutMap);
    const [capsuleElements, setCapsuleElements] = useState<CapsuleElementsMapType>(defaultCapsuleElements);
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

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex justify-end md:mt-2">
                <AddCapsuleToSuitcase capsuleElements={capsuleElements}/>
            </div>
            <PageHeader title="capsule creator" iconPath="/lightbulb.svg" iconAlt="light bulb icon"/>
            <ArticleFilters filterTypes={filterTypes}/>

            <CapsuleElementsContainer filteredArticlesMap={filteredArticlesMap} capsuleElements={capsuleElements} setCapsuleElements={setCapsuleElements} />
        </ArticleFilterContext.Provider>
    )
}

export default CapsuleCreatorContainer;