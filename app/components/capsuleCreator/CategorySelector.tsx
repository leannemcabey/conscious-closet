'use client'
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArticleCategoryEnum, ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import IconButton from "@/app/components/buttons/IconButton";
import { CapsuleElementType } from "@/types/CapsuleElementsMapType";
import { articleCategories } from "@/constants/articleCategories";

interface CategorySelectorProps {
    initialElement: CapsuleElementType;
    selectedCategory: ArticleCategoryEnum | undefined;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum | undefined>>
}

const CategorySelector = ({ initialElement, selectedCategory, setSelectedCategory }: CategorySelectorProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        // We're using initialElement here instead of selectedCategory because there are times
        // when the selectedCategory has not yet been set by the time this component renders.
        // The setTimeout is used so that the capsule element animation can finish before the modal
        // animation happens.
        setTimeout(() => !initialElement.article && setIsOpen(true), 500)
    }, [initialElement]);

    const handleClick = (category: string) => {
        setSelectedCategory(ArticleCategoryEnum[category  as keyof typeof ArticleCategoryEnum])
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col items-center">
            <IconButton
                handleClick={() => setIsOpen(!isOpen)}
                isActive={true}
                iconPath="/hanger-white.svg"
                iconAlt="hanger icon"
                colorOverride={{active: "bg-theme-green", inactive:"bg-theme-green"}}
            />

            {isOpen && (
                <Modal setIsOpen={setIsOpen}>
                    <div className="flex flex-col justify-center">
                        <CloseModalButton setIsOpen={setIsOpen}/>
                        <h3 className="mb-4 text-center md:text-3xl md:mt-6 lg:text-lg">
                            Select a category for this capsule element:
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 max-w-[400px] md:max-w-[90%] self-center">
                            {articleCategories.map((category) =>
                                <button
                                    key={category}
                                    onClick={() => handleClick(category)}
                                    className={`rounded-full text-center text-sm md:text-xl truncate py-1 px-2 ${ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum] === selectedCategory ? "bg-theme-green text-white" : " border border-theme-green text-theme-green"}`}
                                >
                                    {ArticleCategoryTitle[category as keyof typeof ArticleCategoryEnum]}
                                </button>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default CategorySelector;