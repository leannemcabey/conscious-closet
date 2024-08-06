'use client'

import {CapsuleElementsMapType, CapsuleElementType} from "@/types/CapsuleElementsMapType";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";
import * as React from "react";

interface AllElementsViewProps {
    capsuleElements: CapsuleElementsMapType;
    updateExpandedElement: (element: CapsuleElementType) => void;
}

const AllElementsView = ({ capsuleElements, updateExpandedElement }: AllElementsViewProps) => {
    return (
        <div className="h-[77%] grid grid-cols-2 grid-rows-3 justify-items-center">
            {Array.from(capsuleElements.values()).map((element) => {
                return (
                        <CapsuleElement
                            key={element.slot}
                            element={element}
                            updateExpandedElement={updateExpandedElement}
                            sizeStyling={{ width: "w-[125px]", height: "" }}
                            iconPositioning="bottom-[18%] left-[72%]"
                        />
                )
            })}
        </div>
    )
}

export default AllElementsView;