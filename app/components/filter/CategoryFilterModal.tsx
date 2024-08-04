'use client'

import { ArticleCategoryEnum, categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import TextButton from "@/app/components/buttons/TextButton";

interface CategoryFilterModalProps {
    selectedArticleCategories: ArticleCategoryEnum[];
    setSelectedArticleCategories: Dispatch<SetStateAction<ArticleCategoryEnum[]>>;
    setSelectingCategories: Dispatch<SetStateAction<boolean>>;
}

const CategoryFilterModal = ({ selectedArticleCategories, setSelectedArticleCategories, setSelectingCategories }: CategoryFilterModalProps) => {
    // Start with the saved ones before changes begin being made
    const [unsavedSelections, setUnsavedSelections] = useState<ArticleCategoryEnum[]>(selectedArticleCategories);

    const isSelected = (category) => unsavedSelections.includes(category);

    const updateSelections = (category: ArticleCategoryEnum) => {
        // Deselect
        if (isSelected(category)) {
            setUnsavedSelections(unsavedSelections.filter((c) => c !== category))
        }

        // Select
        if (!isSelected(category)) {
            setUnsavedSelections([...unsavedSelections, category])
        }
    }

    const saveSelections = () => {
        setSelectedArticleCategories(unsavedSelections)
        setSelectingCategories(false)
    }

    const allAreSelected = unsavedSelections.length === Object.keys(ArticleCategoryEnum).length

    const selectOrDeselectAll = () => {
        if (allAreSelected) {
            setUnsavedSelections([])
        }

        if (!allAreSelected) {
            const all: ArticleCategoryEnum[] = Object.keys(ArticleCategoryEnum).map((category) => ArticleCategoryEnum[category])
            setUnsavedSelections(all)
        }
    }

    const menuElement= (category: ArticleCategoryEnum) => (
        <div key={category} onClick={() => updateSelections(category)} className="flex space-x-2">
            <div className="min-w-7 max-w-7 min-h-7 max-w-7 rounded-full border border-theme-blue">
                <Image
                    src="/check-mark-button.svg"
                    height="28"
                    width="28"
                    alt="checkmark"
                    className={isSelected(category) ? "" : "hidden"}
                />
            </div>
            <span className="text-base md:text-xl">{categorySlugToTitleMap[category]}</span>
        </div>
    )

    return (
        <Modal setIsOpen={setSelectingCategories}>
            <div className="md:w-[300px]">
                <div className="flex flex-start place-content-between">
                    <TextButton disabled={false} handleClick={() => selectOrDeselectAll()} widthStyling="w-28">
                        {allAreSelected ? "deselect all" : "select all"}
                    </TextButton>
                    <TextButton disabled={false} handleClick={() => saveSelections()} widthStyling="w-28">
                        save
                    </TextButton>
                </div>
                <div className="h-full mt-10">
                    <div className="flex flex-col space-y-2 md:space-y-2.5">
                        {Object.keys(ArticleCategoryEnum)
                            .map((category) => menuElement(ArticleCategoryEnum[category]))
                        }
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CategoryFilterModal;