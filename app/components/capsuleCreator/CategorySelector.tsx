'use client'
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ArticleCategoryEnum, ArticleCategoryTitle, categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import IconButton from "@/app/components/buttons/IconButton";

interface CategorySelectorProps {
    isActive: boolean;
    selectedCategory: ArticleCategoryEnum | undefined;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum>>
}

const CategorySelector = ({ isActive, selectedCategory, setSelectedCategory }: CategorySelectorProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = (category) => {
        setSelectedCategory(ArticleCategoryEnum[category])
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col w-full self-center items-center">
            <IconButton
                handleClick={() => setIsOpen(!isOpen)}
                isActive={isActive}
                iconPath="/hanger.svg"
                iconAlt="hanger icon"
            />

            {isOpen && (
                <Modal setIsOpen={setIsOpen}>
                    <div className="md:w-[300px]">
                        <CloseModalButton setIsOpen={setIsOpen} />
                        <div className="flex flex-col justify-center text-center mt-2">
                            {Object.keys(ArticleCategoryEnum).map((category) => {
                                const selected = ArticleCategoryEnum[category] === selectedCategory
                                return (
                                    <p
                                        key={category}
                                        className={`truncate p-1 border border-dotted border-b-0 border-t-2 border-l-0 border-r-0 ${selected ? "text-text-green" : ""} md:text-2xl md:p-2`}
                                        onClick={() => handleClick(category)}
                                    >
                                        {ArticleCategoryTitle[category]}
                                    </p>
                                )
                            })}
                            <div className="border border-dotted border-b-0 border-t-2 border-l-0 border-r-0"></div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default CategorySelector;