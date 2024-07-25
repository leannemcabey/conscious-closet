'use client'
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {ArticleCategoryEnum, ArticleCategoryTitle, categorySlugToTitleMap} from "@/types/enums/articleCategoryEnum";
import Image from "next/image";

interface DropdownMenuProps {
    selectedCategory: ArticleCategoryEnum;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum>>
}

const DropdownMenu = ({ selectedCategory, setSelectedCategory }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState<boolean>();

    const handleClick = (category) => {
        console.log(category)
        setSelectedCategory(ArticleCategoryEnum[category])
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col w-3/4 mb-2 self-center items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="flex w-full space-x-2 bg-white rounded-full border border-theme-green px-2 justify-center">
                <Image src={`/arrow-down.svg`} width="12" height="12" alt="down arrow" className="self-center"/>
                <p className="truncate">{categorySlugToTitleMap[selectedCategory]}</p>
            </button>

            {isOpen && (
                <div className="absolute h-32 overflow-scroll mt-8 mx-2 bg-white rounded-md text-center">
                    {Object.keys(ArticleCategoryEnum).map((category) => {
                        const selected = ArticleCategoryEnum[category] === selectedCategory
                        return (
                            <p
                                key={category}
                                className="truncate p-1 border border-dotted border-b-2 border-t-0 border-l-0 border-r-0"
                                onClick={() => handleClick(category)}
                            >
                                {ArticleCategoryTitle[category]}
                            </p>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DropdownMenu;