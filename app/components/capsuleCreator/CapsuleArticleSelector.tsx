'use client'
import * as React from "react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import { batchUpdateGoogleUrls } from "@/app/googleService/client/batchUpdateGoogleUrls";
import Polaroid from "@/app/components/articles/Polaroid";
import CategorySelector from "@/app/components/capsuleCreator/CategorySelector";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";
import { CapsuleElementType } from "@/types/CapsuleElementType";
import ErrorModal from "@/app/components/modal/ErrorModal";

interface CapsuleArticleSelectorProps {
    initialElement: CapsuleElementType;
    updateCapsuleElements: (element: CapsuleElementType) => void;
    articlesMap: { string: Article[] };
    doTransition: boolean;
    setDoTransition: Dispatch<SetStateAction<boolean>>;
}

const CapsuleArticleSelector = ({ initialElement, updateCapsuleElements, articlesMap, doTransition, setDoTransition }: CapsuleArticleSelectorProps) => {
    const getInitialIndex = (): number => {
        let tempIndex;

        if (initialElement.article) {
            const articles = articlesMap[initialElement.article?.articleCategory];
            const currentArticle = articles.find((article) => article.id === initialElement.article?.id)
            tempIndex = articles.indexOf(currentArticle);
        }

        return tempIndex ? tempIndex : 0;
    }

    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum | undefined>();
    const [currentIndex, setCurrentIndex] = useState<number>();
    const [currentElement, setCurrentElement] = useState<CapsuleElementType>(null);
    const [refreshedArticlesOfSelectedCategory, setRefreshedArticlesOfSelectedCategory] = useState<Article[]>();
    const [error, setError] = useState<boolean>(false);
    // const [transition, setTransition] = useState<boolean>(doTransition);

    const errorMessage = "An error occurred while creating your capsule. Please try again."
    const noArticlesInCategory = selectedCategory && articlesMap[selectedCategory].length === 0;

    useEffect(() => {
        setDoTransition(false)
    }, [initialElement, doTransition]);

    useEffect(() => {
        setSelectedCategory(initialElement.article?.articleCategory)
    }, [initialElement]);

    useEffect(() => {
        const articles = articlesMap[selectedCategory];

        if (!articles || !articles.length) {
            setRefreshedArticlesOfSelectedCategory([])
            setCurrentIndex(0)
            setCurrentElement(null)
            updateCapsuleElements({ slot: initialElement.slot, article: undefined })
        }

        if (articles && articles.length) {
            batchUpdateGoogleUrls(articles)
                .then((articles) => {
                    setRefreshedArticlesOfSelectedCategory(articles);

                    if (initialElement.article?.articleCategory !== selectedCategory) {
                        setCurrentIndex(0);
                        const newElement = { slot: initialElement.slot, article: articles[0] };
                        setCurrentElement(newElement)
                        updateCapsuleElements(newElement)
                    } else {
                        setCurrentIndex(getInitialIndex())
                        setCurrentElement(initialElement)
                        updateCapsuleElements(initialElement)
                    }

                    setError(false)
                }).catch((error) => {
                    console.log(error)
                    setError(true)
                })
        }
    }, [selectedCategory]);

    const handleLeftArrowClick = () => {
        if (refreshedArticlesOfSelectedCategory) {
            let newIndex;

            if (currentIndex === 0) {
                newIndex = refreshedArticlesOfSelectedCategory?.length - 1;
            } else {
                newIndex = currentIndex - 1;
            }

            const newElement = { slot: initialElement.slot, article: refreshedArticlesOfSelectedCategory[newIndex] };
            setCurrentElement(newElement);
            updateCapsuleElements(newElement);
        }
    }

    const handleRightArrowClick = () => {
        if (refreshedArticlesOfSelectedCategory) {
            let newIndex;

            if (currentIndex === refreshedArticlesOfSelectedCategory?.length - 1) {
                newIndex = 0;
            } else {
                newIndex = currentIndex + 1;
            }

            setCurrentIndex(newIndex);

            const newElement = { slot: initialElement.slot, article: refreshedArticlesOfSelectedCategory[newIndex] };
            setCurrentElement(newElement);
            updateCapsuleElements(newElement);
        }
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <div className={`flex flex-col m-1 md:mt-8 ${doTransition ? "animate-grow" : ""}`}>
            <CategorySelector isActive={!!selectedCategory} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

            <div className="flex space-x-1 justify-center items-center mt-4">
                {noArticlesInCategory &&
                    <p className="text-sm w-3/4 mt-8 text-center self-center text-neutral-400 md:text-2xl">
                        There are no articles in this category
                    </p>}

                {!noArticlesInCategory && (!currentElement || !currentElement.article) &&
                    <UndevelopedPolaroid size="large" />
                }

                {!noArticlesInCategory && currentElement && currentElement.article &&
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

                        <Polaroid imageUrl={currentElement.article.image.baseUrl || ""} size="large"/>

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
            </div>
        </div>
    )
}

export default CapsuleArticleSelector;