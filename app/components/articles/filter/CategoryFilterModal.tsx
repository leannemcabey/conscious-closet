'use client'

import { ArticleCategoryEnum, categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import { Dispatch, SetStateAction, useState } from "react";

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
            <span className="text-md md:text-lg">{categorySlugToTitleMap[category]}</span>
        </div>
    )

    return (
        <Modal setIsOpen={setSelectingCategories}>
            <div className="md:w-[300px]">
                <div className="flex flex-start place-content-between">
                    <button
                        className="border border-theme-blue text-sm text-theme-blue py-1 mx-1 rounded-md drop-shadow w-28 md:text-lg"
                        onClick={() => selectOrDeselectAll()}
                    >
                        {allAreSelected ? "deselect all" : "select all"}
                    </button>
                    <button onClick={() => saveSelections()}
                            className="bg-theme-blue text-sm text-white py-1 mx-1 rounded-md drop-shadow w-28 md:text-lg"
                    >
                        save
                    </button>
                </div>
                <div className="h-full mt-10">
                    <div className="flex flex-col space-y-2">
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