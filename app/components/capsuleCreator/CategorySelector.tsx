'use client'
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ArticleCategoryEnum, ArticleCategoryTitle, categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import IconButton from "@/app/components/buttons/IconButton";

interface CategorySelectorProps {
    openAutomatically: boolean;
    selectedCategory: ArticleCategoryEnum | undefined;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum>>
}

const CategorySelector = ({ openAutomatically, selectedCategory, setSelectedCategory }: CategorySelectorProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!selectedCategory) setIsOpen(true)
    }, [selectedCategory]);

    const handleClick = (category) => {
        setSelectedCategory(ArticleCategoryEnum[category])
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
                    <div className="md:w-[300px]">
                        <CloseModalButton setIsOpen={setIsOpen} />
                        <h3 className="text-xl text-center md:text-3xl">Select a category for this capsule element:</h3>

                        <div className="flex flex-col justify-center text-center mt-2">
                            {Object.keys(ArticleCategoryEnum).map((category) => {
                                const selected = ArticleCategoryEnum[category] === selectedCategory
                                return (
                                    <p
                                        key={category}
                                        className={`truncate my-1 p-1 border border-theme-green rounded-lg ${selected ? "bg-theme-light-green text-text-green" : ""} md:text-2xl md:p-2`}
                                        onClick={() => handleClick(category)}
                                    >
                                        {ArticleCategoryTitle[category]}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default CategorySelector;