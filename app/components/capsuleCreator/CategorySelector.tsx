'use client'
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ArticleCategoryEnum, ArticleCategoryTitle, categorySlugToTitleMap } from "@/types/enums/articleCategoryEnum";
import Image from "next/image";
import Modal from "@/app/components/modal/Modal";
import CloseModalButton from "@/app/components/modal/CloseModalButton";

interface CategorySelectorProps {
    selectedCategory: ArticleCategoryEnum;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum>>
}

const CategorySelector = ({ selectedCategory, setSelectedCategory }: CategorySelectorProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef(null);

    // Closes the menu if the user clicks outside of it
    const outsideClickHandler = (event) => {
        const includesMenuElement = event.composedPath().includes(menuRef.current!!);

        if (menuRef.current && !includesMenuElement) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', outsideClickHandler);
        return () => {
            document.body.removeEventListener('click', outsideClickHandler);
        }
    }, []);

    const handleClick = (category) => {
        setSelectedCategory(ArticleCategoryEnum[category])
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col w-full self-center items-center">
            <button onClick={() => setIsOpen(!isOpen)}
                    className="flex w-[80%] space-x-2 bg-background-green border border-neutral-400 rounded-full px-2 mb-1 justify-center drop-shadow md:py-1 md:mb-2.5"
            >
                <div className="w-[10%] self-center">
                    <Image src={`/pen.svg`} width="12" height="12" alt="down arrow" className="w-full"/>
                </div>
                <p className="truncate text-neutral-500 md:text-xl">{categorySlugToTitleMap[selectedCategory]}</p>
            </button>

            {isOpen && (
                <Modal setIsOpen={setIsOpen}>
                    <CloseModalButton setIsOpen={setIsOpen} />
                    <div className="flex flex-col justify-center text-center">
                        {Object.keys(ArticleCategoryEnum).map((category) => {
                            const selected = ArticleCategoryEnum[category] === selectedCategory
                            return (
                                <p
                                    key={category}
                                    className={`truncate p-1 border border-dotted border-b-2 border-t-0 border-l-0 border-r-0 ${selected ? "text-text-green" : ""} md:text-xl md:p-2`}
                                    onClick={() => handleClick(category)}
                                >
                                    {ArticleCategoryTitle[category]}
                                </p>
                            )
                        })}
                    </div>
                </Modal>
                // <div ref={menuRef} className="absolute h-40 overflow-scroll mx-2 bg-white rounded-md text-center">
                //     {Object.keys(ArticleCategoryEnum).map((category) => {
                //         const selected = ArticleCategoryEnum[category] === selectedCategory
                //         return (
                //             <p
                //                 key={category}
                //                 className={`truncate p-1 border border-dotted border-b-2 border-t-0 border-l-0 border-r-0 ${selectedCategory == ArticleCategoryEnum[category] ? "text-text-green" : ""}`}
                //                 onClick={() => handleClick(category)}
                //             >
                //                 {ArticleCategoryTitle[category]}
                //             </p>
                //         )
                //     })}
                // </div>
            )}
        </div>
    )
}

export default CategorySelector;