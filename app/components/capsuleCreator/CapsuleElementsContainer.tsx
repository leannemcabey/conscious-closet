import CapsuleArticleSelector from "@/app/components/capsuleCreator/CapsuleArticleSelector";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";
import * as React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import ErrorModal from "@/app/components/modal/ErrorModal";
import { CapsuleElementsMapType, CapsuleElementType } from "@/types/CapsuleElementsMapType";
import AllElementsView from "@/app/components/capsuleCreator/AllElementsView";
import { defaultCapsuleElements } from "@/app/components/capsuleCreator/utils/defaultCapsuleElements";
import { Article } from "@/types/article";

interface CapsuleArticlesContainerProps {
    filteredArticlesMap: Map<string, Article[]>;
    capsuleElements: CapsuleElementsMapType;
    setCapsuleElements: Dispatch<SetStateAction<CapsuleElementsMapType>>;
}

const CapsuleElementsContainer = ({ filteredArticlesMap, capsuleElements, setCapsuleElements }: CapsuleArticlesContainerProps) => {
    const [expandedElement, setExpandedElement] = useState<CapsuleElementType>(defaultCapsuleElements.get(0)!!);
    const [doTransition, setDoTransition] = useState<boolean>(true);
    const [showAllElementsView, setShowAllElementsView] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred while creating your capsule. Please try again."

    const updateExpandedElement = (element: CapsuleElementType) => {
        setShowAllElementsView(false)
        setExpandedElement(element);
        setDoTransition(true);
    }

    const updateCapsuleElements = (element: CapsuleElementType) => {
        const tempCapsuleElements: CapsuleElementsMapType = new Map(capsuleElements);
        tempCapsuleElements.set(element.slot, element)
        setCapsuleElements(tempCapsuleElements);
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    if (showAllElementsView) return <AllElementsView capsuleElements={capsuleElements} updateExpandedElement={updateExpandedElement}/>

    return (
        <div className="flex flex-col space-y-[12%] h-[77%] md:h-[73%] md:space-y-[3%]">
            <CapsuleArticleSelector
                articlesMap={filteredArticlesMap}
                updateCapsuleElements={updateCapsuleElements}
                initialElement={expandedElement}
                doTransition={doTransition}
                setDoTransition={setDoTransition}
                setShowAllElementsView={setShowAllElementsView}
            />

            <div className="flex mb-4 w-full h-[100px] justify-center space-x-2 md:space-x-6">
                {Array.from(capsuleElements.values()).map((element) => {
                    if (element.slot !== expandedElement.slot) {
                        return (
                            <CapsuleElement
                                key={element.slot}
                                element={element}
                                updateExpandedElement={updateExpandedElement}
                                sizeStyling="w-[63.5px] md:w-[100px]"
                                iconPositioning="bottom-[30%] left-[45%] md:bottom-[55%]"
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default CapsuleElementsContainer;