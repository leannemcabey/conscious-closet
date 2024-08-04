'use client'
import * as React from "react";
import { useEffect, useState } from "react";
import CapsuleElementSelector from "@/app/components/capsuleCreator/CapsuleElementSelector";
import { Article } from "@/types/article";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import ArticleFilters, { FilterType } from "@/app/components/filter/ArticleFilters";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import AddCapsuleToSuitcase from "@/app/components/capsuleCreator/AddCapsuleToSuitcase";
import ErrorModal from "@/app/components/modal/ErrorModal";
import BackButton from "@/app/components/buttons/BackButton";
import PageHeader from "@/app/components/PageHeader";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";

export interface CapsuleElementType {
    slot: number;
    article: Article | undefined;
}

interface CategoryArticlesMap {
    string: Article[];
}

interface CapsuleCreatorContainerProps {
    articlesMap: CategoryArticlesMap;
}

const CapsuleCreatorContainer = ({ articlesMap }: CapsuleCreatorContainerProps) => {
    const filterCleanout = (): CategoryArticlesMap => {
        const articlesNotInCleanoutMap = {};

        Object.keys(unfilteredArticlesMap).forEach((category) => {
            articlesNotInCleanoutMap[category] = unfilteredArticlesMap[category].filter((article) => !article.inCleanoutBag)
        })

        return articlesNotInCleanoutMap as CategoryArticlesMap;
    }

    const defaultCapsuleElements: CapsuleElementType[] = [
        { slot: 0, article: undefined },
        { slot: 1, article: undefined },
        { slot: 2, article: undefined },
        { slot: 3, article: undefined },
        { slot: 4, article: undefined },
        { slot: 5, article: undefined }
    ]

    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: false,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [unfilteredArticlesMap, setUnfilteredArticlesMap] = useState<CategoryArticlesMap>(articlesMap)
    const articlesNotInCleanoutMap = filterCleanout();
    const [filteredArticlesMap, setFilteredArticlesMap] = useState<CategoryArticlesMap>(articlesNotInCleanoutMap);
    const [capsuleElements, setCapsuleElements] = useState<CapsuleElementType[]>(defaultCapsuleElements)
    const [expandedElement, setExpandedElement] = useState<CapsuleElementType>(defaultCapsuleElements[0]);
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

    const updateCapsuleElements = (element: CapsuleElementType) => {
        const tempCapsuleElements = [ ...capsuleElements ];
        const matchingSlot = tempCapsuleElements.find((e) => e.slot === element.slot)
        const indexToUpdate = tempCapsuleElements.indexOf(matchingSlot)
        tempCapsuleElements[indexToUpdate] = element

        setCapsuleElements(tempCapsuleElements);
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex place-content-between">
                <BackButton/>
                <AddCapsuleToSuitcase capsuleElements={capsuleElements}/>
            </div>
            <PageHeader title="capsule creator" iconPath="/lightbulb.svg" iconAlt="light bulb icon"/>
            <div className="h-[89%] flex flex-col">
                <ArticleFilters filterTypes={filterTypes}/>

                <div className="flex flex-col place-content-between h-full">
                    <CapsuleElementSelector
                        articlesMap={filteredArticlesMap}
                        updateCapsuleElements={updateCapsuleElements}
                        element={expandedElement}
                        setError={setError}
                    />

                    <div className="flex pb-4 w-full space-x-2">
                        {capsuleElements?.map((element) => {
                            if (element.slot !== expandedElement?.slot) {
                                return <CapsuleElement element={element} setExpandedElement={setExpandedElement}/>
                            }
                        })}
                    </div>
                </div>
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CapsuleCreatorContainer;