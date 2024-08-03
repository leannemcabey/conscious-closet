'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import CategoryFilterModal from "@/app/components/filter/CategoryFilterModal";
import Image from "next/image";
import FilterButton from "@/app/components/buttons/FilterButton";

interface CategoryFilterProps {
    selectedArticleCategories: ArticleCategoryEnum[];
    setSelectedArticleCategories: Dispatch<SetStateAction<ArticleCategoryEnum[]>>;
}

const CategoryFilter = ({ selectedArticleCategories, setSelectedArticleCategories }: CategoryFilterProps) => {
    const [selectingCategories, setSelectingCategories] = useState<boolean>();

    return (
        <>
            <FilterButton
                handleClick={() => setSelectingCategories(!selectingCategories)}
                isActive={true}
                iconPath="/hanger.svg"
                iconAlt="hanger icon"
            />

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