'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import CategoryFilterModal from "@/app/components/filter/CategoryFilterModal";
import Image from "next/image";
import IconButton from "@/app/components/buttons/IconButton";

interface CategoryFilterProps {
    selectedArticleCategories: ArticleCategoryEnum[];
    setSelectedArticleCategories: Dispatch<SetStateAction<ArticleCategoryEnum[]>>;
}

const CategoryFilter = ({ selectedArticleCategories, setSelectedArticleCategories }: CategoryFilterProps) => {
    const [selectingCategories, setSelectingCategories] = useState<boolean>(false);

    return (
        <>
            <IconButton
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