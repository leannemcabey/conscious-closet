'use client'
import Polaroid from "@/app/components/articles/Polaroid";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";
import * as React from "react";
import IconButton from "@/app/components/buttons/IconButton";
import { CapsuleElementType } from "@/types/CapsuleElementsMapType";
import Image from "next/image";

interface CapsuleElementProps {
    element: CapsuleElementType;
    updateExpandedElement: (element: CapsuleElementType) => void;
    sizeStyling?: string;
    iconPositioning: string;
}

const CapsuleElement = ({ element, updateExpandedElement, sizeStyling, iconPositioning }: CapsuleElementProps) => {
    return (
        <div className="my-1 mx-1 md:mx-2 w-[70%] md:w-[90%]">
            {!element.article && <UndevelopedPolaroid sizeStyling={sizeStyling}/>}

            {element.article &&
                <Polaroid
                    imageUrl={element.article.image.baseUrl}
                    sizeStyling={sizeStyling}
                />}

            <button
                onClick={() => updateExpandedElement(element)}
                className={`flex justify-center p-2 rounded-lg bg-white border border-theme-green w-[40px] h-[40px] relative ${iconPositioning}`}
            >
                <Image
                    src="/expand.svg"
                    height={40}
                    width={40}
                    alt="expand capsule element"
                    className="w-full"
                />
            </button>
        </div>
    )
}

export default CapsuleElement;