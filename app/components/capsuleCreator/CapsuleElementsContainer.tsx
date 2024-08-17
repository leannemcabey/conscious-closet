import CapsuleArticleSelector from "@/app/components/capsuleCreator/CapsuleArticleSelector";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";
import * as React from "react";
import { CategoryArticlesMap } from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import { Dispatch, SetStateAction, useState } from "react";
import ErrorModal from "@/app/components/modal/ErrorModal";
import { CapsuleElementsMapType, CapsuleElementType } from "@/types/CapsuleElementsMapType";
import AllElementsView from "@/app/components/capsuleCreator/AllElementsView";
import { defaultCapsuleElements } from "@/app/components/capsuleCreator/utils/defaultCapsuleElements";

interface CapsuleArticlesContainerProps {
    filteredArticlesMap: CategoryArticlesMap;
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
        <div className="flex flex-col lg:flex-row space-y-[5%] md:space-y-[3%] h-[77%] md:h-[80%] lg:h-[80%]">
            <CapsuleArticleSelector
                articlesMap={filteredArticlesMap}
                updateCapsuleElements={updateCapsuleElements}
                initialElement={expandedElement}
                doTransition={doTransition}
                setDoTransition={setDoTransition}
                setShowAllElementsView={setShowAllElementsView}
            />

            <div className="grid grid-cols-5 mb-4 w-full justify-center lg:h-full lg:items-center">
                {Array.from(capsuleElements.values()).map((element) => {
                    if (element.slot !== expandedElement.slot) {
                        return (
                            <CapsuleElement
                                key={element.slot}
                                element={element}
                                updateExpandedElement={updateExpandedElement}
                                iconPositioning="bottom-[23%] left-[48%] md:bottom-[13%] md:left-[76%] lg:left-[70%] lg:mt-1"
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default CapsuleElementsContainer;