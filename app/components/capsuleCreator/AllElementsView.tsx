'use client'
import { CapsuleElementsMapType, CapsuleElementType } from "@/types/CapsuleElementsMapType";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";
import * as React from "react";

interface AllElementsViewProps {
    capsuleElements: CapsuleElementsMapType;
    updateExpandedElement: (element: CapsuleElementType) => void;
}

const AllElementsView = ({ capsuleElements, updateExpandedElement }: AllElementsViewProps) => {
    return (
        <div className="h-[75%] grid grid-cols-2 grid-rows-3 justify-items-center md:grid-cols-3 md:grid-rows-2 md:mt-12 lg:grid-cols-6">
            {Array.from(capsuleElements.values()).map((element) => {
                return (
                    <CapsuleElement
                        key={element.slot}
                        element={element}
                        updateExpandedElement={updateExpandedElement}
                        sizeStyling= "w-[110px] max-h-[187px] md:w-[200px] md:max-h-[299px]"
                        iconPositioning="bottom-[18%] left-[72%] md:bottom-[55px] lg:bottom-[0] lg:left-[80%] lg:mt-2"
                    />
                )
            })}
        </div>
    )
}

export default AllElementsView;