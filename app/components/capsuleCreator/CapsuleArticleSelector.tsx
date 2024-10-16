'use client'
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import { batchUpdateGoogleUrlsWithRetry } from "@/app/googleService/client/batchUpdateGoogleUrlsWithRetry";
import Polaroid from "@/app/components/articles/Polaroid";
import CategorySelector from "@/app/components/capsuleCreator/CategorySelector";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";
import { CapsuleElementType } from "@/types/CapsuleElementsMapType";
import ErrorModal from "@/app/components/modal/ErrorModal";
import IconButton from "@/app/components/buttons/IconButton";
import { CategoryArticlesMap } from "@/app/components/capsuleCreator/CapsuleCreatorContainer";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CapsuleArticleSelectorProps {
    initialElement: CapsuleElementType;
    updateCapsuleElements: (element: CapsuleElementType) => void;
    articlesMap: CategoryArticlesMap;
    doTransition: boolean;
    setDoTransition: Dispatch<SetStateAction<boolean>>;
    setShowAllElementsView: Dispatch<SetStateAction<boolean>>;
}

const CapsuleArticleSelector = ({ initialElement, updateCapsuleElements, articlesMap, doTransition, setDoTransition, setShowAllElementsView }: CapsuleArticleSelectorProps) => {
    const getInitialIndex = (): number => {
        let tempIndex;

        if (initialElement.article) {
            const articles = articlesMap[initialElement.article.articleCategory];
            const currentArticle = articles.find((article) => article.id === initialElement.article?.id);
            // If it can't find the article, it's because filters have been applied that filtered it out
            if (!currentArticle) throw new Error();
            tempIndex = articles.indexOf(currentArticle);
        }

        return tempIndex ? tempIndex : 0;
    }

    const router = useRouter();
    const [currentSlot, setCurrentSlot] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum | undefined>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentElement, setCurrentElement] = useState<CapsuleElementType | undefined>(undefined);
    const [refreshedArticlesOfSelectedCategory, setRefreshedArticlesOfSelectedCategory] = useState<Article[]>();
    const [refreshUrlsError, setRefreshUrlsError] = useState<boolean>(false);
    const [filterError, setFilterError] = useState<boolean>(false);


    let refreshUrlsErrorMessage = "An error occurred while retrieving your articles. Please go back and try again."
    let filerErrorMessage = "Looks like you might have filtered out the article for this capsule element. Remove your filters and try again."

    const noArticlesInCategory = selectedCategory && articlesMap[selectedCategory].length === 0;

    useEffect(() => {
        setTimeout(() => setDoTransition(false), 400)
    }, [initialElement]);

    useEffect(() => {
        setCurrentSlot(initialElement.slot)
        setSelectedCategory(initialElement.article?.articleCategory)
    }, [initialElement]);

    useEffect(() => {
        // This makes it so that the animation runs with UndevelopedPolaroid, rather than the previous element,
        // and also handles the scenario where there is no article selected
        setRefreshedArticlesOfSelectedCategory([])
        setCurrentIndex(0)
        setCurrentElement(undefined)
        updateCapsuleElements({ slot: initialElement.slot, article: undefined })

        if (selectedCategory) {
            const articles = articlesMap[selectedCategory];
            if (articles && articles.length) {
                batchUpdateGoogleUrlsWithRetry(articles, router)
                    .then((articles) => {
                        setRefreshedArticlesOfSelectedCategory(articles);

                        // Handles change of selected category
                        if (initialElement.article?.articleCategory !== selectedCategory) {
                            setCurrentIndex(0);
                            const newElement = { slot: initialElement.slot, article: articles[0] };
                            setCurrentElement(newElement)
                            updateCapsuleElements(newElement)
                        }
                        // Handles initial load of new slot
                        else {
                            // Start by saving the initial element to the capsule elements
                            updateCapsuleElements(initialElement)

                            try {
                                // If it can't find the index, it's because filters have been applied that filtered out the selected article
                                setCurrentIndex(getInitialIndex())
                                setCurrentElement(initialElement)
                                setRefreshUrlsError(false)
                                setFilterError(false)
                            } catch {
                                setFilterError(true)
                            }
                        }

                    }).catch((error) => {
                        console.log(error)
                        setRefreshUrlsError(true)
                    })
            }

        }
    }, [articlesMap, currentSlot, selectedCategory]);

    const handleArrowClick = (arrow: "left" | "right") => {
        if (refreshedArticlesOfSelectedCategory) {
            let newIndex;

            if (arrow === "left") {
                if (currentIndex === 0) {
                    newIndex = refreshedArticlesOfSelectedCategory.length - 1;
                } else {
                    newIndex = currentIndex - 1;
                }
            }

            if (arrow === "right") {
                if (currentIndex === refreshedArticlesOfSelectedCategory.length - 1) {
                    newIndex = 0;
                } else {
                    newIndex = currentIndex + 1;
                }
            }

            setCurrentIndex(newIndex!!);
            const newElement = { slot: initialElement.slot, article: refreshedArticlesOfSelectedCategory[newIndex!!] };
            setCurrentElement(newElement);
            updateCapsuleElements(newElement);
        }
    }

    return (
        <>
            <div className="h-full flex flex-col justify-center items-center m-1 lg:w-[60%]">
                <div className="flex w-full justify-end space-x-2">
                    <CategorySelector
                        initialElement={initialElement}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                    <IconButton
                        handleClick={() => setShowAllElementsView(true)}
                        isActive={true}
                        iconPath="/collapse.svg"
                        iconAlt="collapse"
                    />
                </div>

                <div className={`h-[90%] w-full flex space-x-1 items-center justify-center mt-4 ${doTransition ? "animate-grow" : ""}`}>
                    {noArticlesInCategory &&
                        <p className="text-sm w-3/4 mt-8 text-center self-center text-neutral-400 md:text-2xl">
                            There are no articles in this category
                        </p>}

                    {!noArticlesInCategory && (!currentElement || !currentElement.article) &&
                        <UndevelopedPolaroid
                            sizeStyling="w-[70%] md:w-[45%] lg:w-[65%]"
                        />
                    }

                    {!noArticlesInCategory && currentElement && currentElement.article &&
                        <>
                            <div className="w-[30px] h-[30px]">
                                <Image
                                    src="/left-arrow-green.svg"
                                    alt="next"
                                    width={30}
                                    height={30}
                                    className="w-full"
                                    onClick={() => handleArrowClick("left")}
                                />
                            </div>

                            <Polaroid
                                imageUrl={currentElement.article.image.baseUrl || ""}
                                sizeStyling="w-[70%] md:w-[45%] lg:w-[65%]"
                            />

                            <div className="w-[30px] h-[30px]">
                                <Image
                                    src="/left-arrow-green.svg"
                                    alt="previous"
                                    width={30}
                                    height={30}
                                    className="w-full rotate-180"
                                    onClick={() => handleArrowClick("right")}
                                />
                            </div>
                        </>
                    }
                </div>
            </div>

            {refreshUrlsError && <ErrorModal setIsOpen={setRefreshUrlsError} errorMessage={refreshUrlsErrorMessage}/>}
            {filterError && <ErrorModal setIsOpen={setFilterError} errorMessage={filerErrorMessage}/>}
        </>
    )
}

export default CapsuleArticleSelector;