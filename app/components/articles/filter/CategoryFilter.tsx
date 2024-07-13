'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import CategoryFilterModal from "@/app/components/articles/filter/CategoryFilterModal";

interface CategoryFilterProps {
    selectedArticleCategories: ArticleCategoryEnum[];
    setSelectedArticleCategories: Dispatch<SetStateAction<ArticleCategoryEnum[]>>;
}

const CategoryFilter = ({ selectedArticleCategories, setSelectedArticleCategories }: CategoryFilterProps) => {
    const [selectingCategories, setSelectingCategories] = useState<boolean>();

    return (
        <>
            <button
                className="px-2 py-1 rounded-full text-sm border border-theme-blue bg-white text-theme-blue"
                onClick={() => setSelectingCategories(!selectingCategories)}
            >
                categories
            </button>

            {selectingCategories &&
                <CategoryFilterModal
                    selectedArticleCategories={selectedArticleCategories}
                    setSelectedArticleCategories={setSelectedArticleCategories}
                    setSelectingCategories={setSelectingCategories}
                />
            }
        </>
    )
}

export default CategoryFilter;