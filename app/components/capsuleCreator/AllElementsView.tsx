'use client'

import {CapsuleElementType} from "@/types/CapsuleElementType";
import CapsuleElement from "@/app/components/capsuleCreator/CapsuleElement";
import * as React from "react";

interface AllElementsViewProps {
    capsuleElements: CapsuleElementType[];
    updateExpandedElement: (element: CapsuleElementType) => void;
}

const AllElementsView = ({ capsuleElements, updateExpandedElement }: AllElementsViewProps) => {
    return (
        <div className="grid grid-cols-2">
            {capsuleElements?.map((element) => {
                return (
                    <CapsuleElement
                        key={element.slot}
                        element={element}
                        updateExpandedElement={updateExpandedElement}
                    />
                )
            })}
        </div>
    )
}

export default AllElementsView;