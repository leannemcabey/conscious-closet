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
import { CapsuleElementType } from "@/types/CapsuleElementType";
import ErrorModal from "@/app/components/modal/ErrorModal";
import IconButton from "@/app/components/buttons/IconButton";

interface CapsuleArticleSelectorProps {
    initialElement: CapsuleElementType;
    updateCapsuleElements: (element: CapsuleElementType) => void;
    articlesMap: { string: Article[] };
    doTransition: boolean;
    setDoTransition: Dispatch<SetStateAction<boolean>>;
    setShowAllElementsView: Dispatch<SetStateAction<boolean>>;
}

const CapsuleArticleSelector = ({ initialElement, updateCapsuleElements, articlesMap, doTransition, setDoTransition, setShowAllElementsView }: CapsuleArticleSelectorProps) => {
    // console.log(`doTransition: ${doTransition}`)
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

    const errorMessage = "An error occurred while creating your capsule. Please try again."
    const noArticlesInCategory = selectedCategory && articlesMap[selectedCategory].length === 0;

    useEffect(() => {
        setTimeout(() => setDoTransition(false), 400)
    }, [initialElement]);

    useEffect(() => {
        setSelectedCategory(initialElement.article?.articleCategory)
    }, [initialElement]);

    useEffect(() => {
        // This makes it so that the animation runs with UndevelopedPolaroid, rather than the previous element,
        // and also handles the scenario where there is no article selected
        setRefreshedArticlesOfSelectedCategory([])
        setCurrentIndex(0)
        setCurrentElement(null)
        updateCapsuleElements({ slot: initialElement.slot, article: undefined })

        const articles = articlesMap[selectedCategory];

        if (articles && articles.length) {
            batchUpdateGoogleUrls(articles)
                .then((articles) => {
                    console.log(`batch update: ${articles.length}`)
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
    }, [articlesMap, selectedCategory]);

    const handleArrowClick = (arrow: "left" | "right") => {
        if (refreshedArticlesOfSelectedCategory) {
            let newIndex;

            if (arrow === "left") {
                if (currentIndex === 0) {
                    newIndex = refreshedArticlesOfSelectedCategory?.length - 1;
                } else {
                    newIndex = currentIndex - 1;
                }
            }

            if (arrow === "right") {
                if (currentIndex === refreshedArticlesOfSelectedCategory?.length - 1) {
                    newIndex = 0;
                } else {
                    newIndex = currentIndex + 1;
                }
            }

            setCurrentIndex(newIndex);
            const newElement = { slot: initialElement.slot, article: refreshedArticlesOfSelectedCategory[newIndex] };
            setCurrentElement(newElement);
            updateCapsuleElements(newElement);
        }
    }

    if (error) return <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />

    return (
        <div className="flex flex-col justify-center items-center m-1 md:mt-8">
            <div className="flex w-full place-content-between">
                <CategorySelector
                    openAutomatically={!selectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <div className="">
                    <IconButton
                        handleClick={() => setShowAllElementsView(true)}
                        isActive={true}
                        iconPath="/collapse.svg"
                        iconAlt="collapse"
                        colorOverride={{active: "bg-theme-green", inactive:"bg-theme-green"}}
                    />
                </div>
            </div>

            <div className={`flex space-x-1 items-center justify-center mt-4 ${doTransition ? "animate-grow" : ""}`}>
                {noArticlesInCategory &&
                    <p className="text-sm w-3/4 mt-8 text-center self-center text-neutral-400 md:text-2xl">
                        There are no articles in this category
                    </p>}

                {!noArticlesInCategory && (!currentElement || !currentElement.article) &&
                    <>
                        <UndevelopedPolaroid size="large"/>
                    </>
                }

                {!noArticlesInCategory && currentElement && currentElement.article &&
                    <>
                        <div className="w-[10%]">
                            <Image
                                src={"/left-arrow.svg"}
                                alt={"left arrow"}
                                width="15"
                                height="15"
                                onClick={() => handleArrowClick("left")}
                                className="h-max rounded-full bg-theme-background-green w-full"
                            />
                        </div>

                        <Polaroid imageUrl={currentElement.article.image.baseUrl || ""} size="large"/>

                        <div className="w-[10%]">
                            <Image
                                src={"/left-arrow.svg"}
                                alt={"right arrow"}
                                width="15"
                                height="15"
                                onClick={() => handleArrowClick("right")}
                                className="rotate-180 h-max rounded-full bg-theme-background-green w-full"
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default CapsuleArticleSelector;