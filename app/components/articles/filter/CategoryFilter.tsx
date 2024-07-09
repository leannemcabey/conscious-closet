'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import CategoryFilterModal from "@/app/components/articles/filter/CategoryFilterModal";

interface CategoryFilterProps {
    selectedArticleCategories: ArticleCategory[];
    setSelectedArticleCategories: Dispatch<SetStateAction<ArticleCategory[]>>;
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