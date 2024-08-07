'use client'
import Polaroid from "@/app/components/articles/Polaroid";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";
import * as React from "react";
import IconButton from "@/app/components/buttons/IconButton";
import { CapsuleElementType } from "@/types/CapsuleElementsMapType";

interface CapsuleElementProps {
    element: CapsuleElementType;
    updateExpandedElement: (element: CapsuleElementType) => void;
    sizeStyling: string;
    iconPositioning: string;
}

const CapsuleElement = ({ element, updateExpandedElement, sizeStyling, iconPositioning }: CapsuleElementProps) => {
    return (
        <div>
            {!element.article && <UndevelopedPolaroid sizeStyling={sizeStyling}/>}

            {element.article &&
                <Polaroid
                    imageUrl={element.article?.image.baseUrl || ""}
                    sizeStyling={sizeStyling}
                />}

            <div className={`relative ${iconPositioning}`}>
                <IconButton
                    handleClick={() => updateExpandedElement(element)}
                    isActive={true}
                    iconPath="/expand.svg"
                    iconAlt="expand"
                />
            </div>
        </div>
    )
}

export default CapsuleElement;