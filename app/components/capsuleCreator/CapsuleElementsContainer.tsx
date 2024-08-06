import CapsuleArticleSelector from "@/app/components/capsuleCreator/CapsuleArticleSelector";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";
import * as React from "react";
import { CategoryArticlesMap } from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import { Dispatch, SetStateAction, useState } from "react";
import ErrorModal from "@/app/components/modal/ErrorModal";
import { defaultCapsuleElements } from "@/app/components/capsuleCreator/utils/defaultCapsuleElements";
import { CapsuleElementType } from "@/types/CapsuleElementType";
import AllElementsView from "@/app/components/capsuleCreator/AllElementsView";

interface CapsuleArticlesContainerProps {
    filteredArticlesMap: CategoryArticlesMap;
    capsuleElements: CapsuleElementType[];
    setCapsuleElements: Dispatch<SetStateAction<CapsuleElementType[]>>;
}

const CapsuleElementsContainer = ({ filteredArticlesMap, capsuleElements, setCapsuleElements }: CapsuleArticlesContainerProps) => {
    // console.log(`CapsuleElementsContainer filteredArticlesMap: ${JSON.stringify(filteredArticlesMap)}`)

    const [expandedElement, setExpandedElement] = useState<CapsuleElementType>(defaultCapsuleElements[0]);
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
        // console.log(JSON.stringify(element))
        const tempCapsuleElements = [ ...capsuleElements ];
        const matchingSlot = tempCapsuleElements.find((e) => e.slot === element.slot)

        // console.log(`matching slot: ${JSON.stringify(matchingSlot)}`)

        if (matchingSlot) {
            const indexToUpdate = tempCapsuleElements.indexOf(matchingSlot)
            tempCapsuleElements[indexToUpdate] = element
        } else setError(true)

        setCapsuleElements(tempCapsuleElements);
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    if (showAllElementsView) return <AllElementsView capsuleElements={capsuleElements} updateExpandedElement={updateExpandedElement}/>

    return (
        <div className="flex flex-col place-content-between h-[78%]">
            <CapsuleArticleSelector
                articlesMap={filteredArticlesMap}
                updateCapsuleElements={updateCapsuleElements}
                initialElement={expandedElement}
                doTransition={doTransition}
                setDoTransition={setDoTransition}
                setShowAllElementsView={setShowAllElementsView}
            />

            <div className="flex pb-4 w-full justify-center space-x-2">
                {capsuleElements?.map((element) => {
                    if (element.slot !== expandedElement.slot) {
                        return (
                            <CapsuleElement
                                key={element.slot}
                                element={element}
                                updateExpandedElement={updateExpandedElement}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default CapsuleElementsContainer;