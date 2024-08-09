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
import BackButton from "@/app/components/buttons/BackButton";
import PageHeader from "@/app/components/PageHeader";
import CapsuleElementsContainer from "@/app/components/capsuleCreator/CapsuleElementsContainer";
import { defaultCapsuleElements } from "@/app/components/capsuleCreator/utils/defaultCapsuleElements";
import { CapsuleElementsMapType } from "@/types/CapsuleElementsMapType";

interface CapsuleCreatorContainerProps {
    articlesMap: Map<string, Article[]>;
}

const CapsuleCreatorContainer = ({ articlesMap }: CapsuleCreatorContainerProps) => {
    console.log(`articlesMap: ${JSON.stringify(articlesMap)}`)
    const filterCleanout = (): Map<string, Article[]> => {
        const articlesNotInCleanoutMap = new Map<string, Article[]>;

        Object.keys(unfilteredArticlesMap).forEach((category) => {
            const articles = unfilteredArticlesMap.get(category)
            if (articles) articlesNotInCleanoutMap.set(category, articles.filter((article) => !article.inCleanoutBag))
            if (!articles) articlesNotInCleanoutMap.set(category, [])
        })

        return articlesNotInCleanoutMap;
    }

    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticlesMap, setUnfilteredArticlesMap] = useState<Map<string, Article[]>>(articlesMap)
    const articlesNotInCleanoutMap = filterCleanout();
    const [filteredArticlesMap, setFilteredArticlesMap] = useState<Map<string, Article[]>>(articlesNotInCleanoutMap);
    const [capsuleElements, setCapsuleElements] = useState<CapsuleElementsMapType>(defaultCapsuleElements);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."
    const filterTypes= [FilterType.cleanout, FilterType.weather];

    useEffect(() => {
        let tempFilteredArticlesMap: Map<string, Article[]> = { ...unfilteredArticlesMap };
        Object.keys(tempFilteredArticlesMap).forEach((category) => {
            tempFilteredArticlesMap.set(category, applyArticleFilters(unfilteredArticlesMap.get(category) || [], filterTypes, filterSettings))
        })

        setFilteredArticlesMap(tempFilteredArticlesMap)
    }, [unfilteredArticlesMap, filterSettings]);

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex place-content-between">
                <BackButton/>
                <AddCapsuleToSuitcase capsuleElements={capsuleElements}/>
            </div>
            <PageHeader title="capsule creator" iconPath="/lightbulb.svg" iconAlt="light bulb icon"/>
            <ArticleFilters filterTypes={filterTypes}/>

            <CapsuleElementsContainer filteredArticlesMap={filteredArticlesMap} capsuleElements={capsuleElements} setCapsuleElements={setCapsuleElements} />
        </ArticleFilterContext.Provider>
    )
}

export default CapsuleCreatorContainer;