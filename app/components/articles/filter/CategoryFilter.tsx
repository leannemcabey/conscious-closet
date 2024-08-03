'use client'
import { Dispatch, SetStateAction, useState } from "react";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import CategoryFilterModal from "@/app/components/articles/filter/CategoryFilterModal";
import Image from "next/image";

interface CategoryFilterProps {
    selectedArticleCategories: ArticleCategoryEnum[];
    setSelectedArticleCategories: Dispatch<SetStateAction<ArticleCategoryEnum[]>>;
}

const CategoryFilter = ({ selectedArticleCategories, setSelectedArticleCategories }: CategoryFilterProps) => {
    const [selectingCategories, setSelectingCategories] = useState<boolean>();

    return (
        <>
            <div
                onClick={() => setSelectingCategories(!selectingCategories)}
                className={`flex justify-center p-2 rounded-full border border-theme-blue rounded-full bg-white drop-shadow w-[40px] md:w-[50px]`}
            >
                <Image
                    src="/hanger.svg"
                    height={40}
                    width={40}
                    alt="hanger icon"
                    className="w-full"/>
            </div>

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