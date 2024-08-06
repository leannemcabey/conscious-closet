'use client'
import Polaroid from "@/app/components/articles/Polaroid";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";
import * as React from "react";
import IconButton from "@/app/components/buttons/IconButton";
import { Dispatch, SetStateAction } from "react";
import { CapsuleElementType } from "@/types/CapsuleElementType";

interface CapsuleElementProps {
    element: CapsuleElementType;
    updateExpandedElement: (element: CapsuleElementType) => void;
}

const CapsuleElement = ({ element, updateExpandedElement }: CapsuleElementProps) => {
    return (
        <div className="h-[105px]">
            {!element.article && <UndevelopedPolaroid size="small"/>}

            {element.article && <Polaroid imageUrl={element.article?.image.baseUrl || ""} size="small"/>}

            <div className="relative bottom-10 left-[30px]">
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