'use client'

import { ArticleCategoryEnum, categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import { Dispatch, SetStateAction, useState } from "react";
import TextButton from "@/app/components/buttons/TextButton";
import CloseModalButton from "@/app/components/modal/CloseModalButton";
import { articleCategories } from "@/constants/articleCategories";
import SaveButton from "@/app/components/buttons/SaveButton";

interface CategoryFilterModalProps {
    selectedArticleCategories: ArticleCategoryEnum[];
    setSelectedArticleCategories: Dispatch<SetStateAction<ArticleCategoryEnum[] | undefined>>;
    setSelectingCategories: Dispatch<SetStateAction<boolean>>;
}

const CategoryFilterModal = ({ selectedArticleCategories, setSelectedArticleCategories, setSelectingCategories }: CategoryFilterModalProps) => {
    // Start with the saved ones before changes begin being made
    const [unsavedSelections, setUnsavedSelections] = useState<ArticleCategoryEnum[]>(selectedArticleCategories);

    const isSelected = (category: ArticleCategoryEnum) => unsavedSelections.includes(category);

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

    const allAreSelected = unsavedSelections.length === articleCategories.length

    const selectOrDeselectAll = () => {
        if (allAreSelected) {
            setUnsavedSelections([])
        }

        if (!allAreSelected) {
            const all: ArticleCategoryEnum[] = articleCategories.map((category) => ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])
            setUnsavedSelections(all)
        }
    }

    const menuElement= (category: ArticleCategoryEnum) => (
        <div key={category} onClick={() => updateSelections(category)} className="flex items-center space-x-2">
            <div className="min-w-7 max-w-7 min-h-7 max-w-7 rounded-full border border-theme-blue">
                <Image
                    src="/check-mark-button.svg"
                    height="28"
                    width="28"
                    alt="checkmark"
                    className={isSelected(category) ? "" : "hidden"}
                />
            </div>
            <span className="text-base md:text-xl lg:text-base">{categorySlugToTitleMap[category]}</span>
        </div>
    )

    return (
        <Modal setIsOpen={setSelectingCategories}>
            <>
                <CloseModalButton setIsOpen={setSelectingCategories} />
                <TextButton disabled={false} handleClick={() => selectOrDeselectAll()} widthStyling="w-28">
                    {allAreSelected ? "deselect all" : "select all"}
                </TextButton>
                <div className="flex flex-col mt-8">
                    <div className="h-full">
                        <div className="flex flex-col space-y-2 md:space-y-2.5">
                            {articleCategories
                                .map((category) => menuElement(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum]))
                            }
                        </div>
                    </div>

                    <SaveButton handleClick={saveSelections} />
                </div>
            </>
        </Modal>
    )
}

export default CategoryFilterModal;