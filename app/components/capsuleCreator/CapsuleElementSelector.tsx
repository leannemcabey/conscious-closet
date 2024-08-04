'use client'
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import { batchUpdateGoogleUrls } from "@/app/googleService/client/batchUpdateGoogleUrls";
import Polaroid from "@/app/components/articles/Polaroid";
import CategorySelector from "@/app/components/capsuleCreator/CategorySelector";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";
import {CapsuleElementType} from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import {updateGoogleUrl} from "@/app/googleService/client/updateGoogleUrl";

interface CapsuleElementSelectorProps {
    updateCapsuleElements: (element: CapsuleElementType) => void;
    articlesMap: { string: Article[] };
    element: CapsuleElementType;
    setError: Dispatch<SetStateAction<boolean>>;
}

const CapsuleElementSelector = ({updateCapsuleElements, articlesMap, element, setError }: CapsuleElementSelectorProps) => {
    console.log(`element selector: ${JSON.stringify(element)}`)

    const [currentElement, setCurrentElement] = useState<CapsuleElementType>(element);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum | undefined>(element.article?.articleCategory);
    const [currentIndex, setCurrentIndex] = useState<number>();
    const [refreshedArticlesOfSelectedCategory, setRefreshedArticlesOfSelectedCategory] = useState<Article[]>();

    const noArticlesInCategory = selectedCategory && articlesMap[selectedCategory].length === 0;


    // resetting the index i think might still be weird when the category is changed to the same one


    useEffect(() => {
        if (!selectedCategory) {
            setRefreshedArticlesOfSelectedCategory([])
            setCurrentIndex(undefined)
        }

        if (selectedCategory) {
            const articles = articlesMap[selectedCategory];

            if (articles.length > 0) {
                batchUpdateGoogleUrls(articles)
                    .then((articles) => {
                        setRefreshedArticlesOfSelectedCategory(articles);
                        setError(false)
                    })
                    .catch((error) => {
                        console.log(error)
                        setError(true)
                    })
            } else {
                setRefreshedArticlesOfSelectedCategory([])
            }
        }
    }, [articlesMap, element, selectedCategory]);

    useEffect(() => {
        if (!refreshedArticlesOfSelectedCategory) {
            setCurrentIndex(undefined);
        }

        if (refreshedArticlesOfSelectedCategory) {
            const currentArticle = currentElement.article && refreshedArticlesOfSelectedCategory.find((article) => article.id === element.article?.id)
            const tempIndex = currentArticle ? refreshedArticlesOfSelectedCategory.indexOf(currentArticle) : 0;
            setCurrentIndex(tempIndex)
        }
    }, [refreshedArticlesOfSelectedCategory]);

    useEffect(() => {
        if (refreshedArticlesOfSelectedCategory) {
            const newArticle = refreshedArticlesOfSelectedCategory[currentIndex];
            const newElement: CapsuleElementType = { ...currentElement, article: newArticle };
            setCurrentElement(newElement);
            updateCapsuleElements(newElement);
        }
    }, [currentIndex]);

    const handleLeftArrowClick = () => {
        if (currentIndex === 0) {
            setCurrentIndex(refreshedArticlesOfSelectedCategory?.length - 1)
        } else {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const handleRightArrowClick = () => {
        if (currentIndex === refreshedArticlesOfSelectedCategory?.length - 1) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(currentIndex + 1)
        }
    }

    return (
        <div className="flex flex-col m-1 md:mt-8">
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

            <div className="flex space-x-1 justify-center items-center mt-4">
                {noArticlesInCategory &&
                    <p className="text-sm w-3/4 mt-8 text-center self-center text-neutral-400 md:text-2xl">
                        There are no articles in this category
                    </p>}

                {currentElement.article &&
                    <>
                        <div className="w-[10%]">
                            <Image
                                src={"/full-arrow.svg"}
                                alt={"left arrow"}
                                width="15"
                                height="15"
                                onClick={() => handleLeftArrowClick()}
                                className="rotate-180 h-max rounded-full bg-theme-background-green w-full"
                            />
                        </div>

                        <Polaroid imageUrl={currentElement.article?.image.baseUrl || ""} size="large"/>

                        <div className="w-[10%]">
                            <Image
                                src={"/full-arrow.svg"}
                                alt={"right arrow"}
                                width="15"
                                height="15"
                                onClick={() => handleRightArrowClick()}
                                className="h-max rounded-full bg-theme-background-green w-full"
                            />
                        </div>
                    </>
                }

                {!currentElement.article &&
                    <UndevelopedPolaroid size="large" />
                }
            </div>
        </div>
    )
}

export default CapsuleElementSelector;