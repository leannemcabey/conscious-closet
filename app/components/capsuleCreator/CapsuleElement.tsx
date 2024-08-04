'use client'
import { CapsuleElementType } from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import Polaroid from "@/app/components/articles/Polaroid";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";
import * as React from "react";
import IconButton from "@/app/components/buttons/IconButton";
import {Dispatch, SetStateAction} from "react";

interface CapsuleElementProps {
    element: CapsuleElementType;
    setExpandedElement: Dispatch<SetStateAction<CapsuleElementType>>;
}

const CapsuleElement = ({ element, setExpandedElement }: CapsuleElementProps) => {
    return (
        <div className="h-[105px]">
            {element.article && <Polaroid imageUrl={element.article?.image.baseUrl || ""} size="small"/>}

            {!element.article && <UndevelopedPolaroid size="small"/>}

            <div className="relative bottom-10 left-[30px]">
                <IconButton
                    handleClick={() => setExpandedElement(element)}
                    isActive={true}
                    iconPath="/expand.svg"
                    iconAlt="expand"
                />
            </div>
        </div>
    )
}

export default CapsuleElement;