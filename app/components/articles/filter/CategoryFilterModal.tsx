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
            <span>{categorySlugToTitleMap[category]}</span>
        </div>
    )

    return (
        <Modal setIsOpen={setSelectingCategories}>
            <button onClick={() => saveSelections()}
                    className="fixed top-4 right-4 bg-theme-blue text-white self-end px-2 py-1 rounded-md drop-shadow">
                Save
            </button>
            <div className="h-full mt-10">
                <div className="flex flex-col space-y-2">
                    {menuElement(ArticleCategoryEnum.TOPS)}
                    {menuElement(ArticleCategoryEnum.BOTTOMS)}
                    {menuElement(ArticleCategoryEnum.JUMPSUITS_ROMPERS)}
                    {menuElement(ArticleCategoryEnum.ACTIVEWEAR)}
                    {menuElement(ArticleCategoryEnum.SHOES)}
                    {menuElement(ArticleCategoryEnum.OUTERWEAR)}
                    {menuElement(ArticleCategoryEnum.ACCESSORIES)}
                </div>
            </div>
        </Modal>
    )
}

export default CategoryFilterModal;