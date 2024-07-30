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

interface CapsuleElementProps {
    defaultArticleType: ArticleCategoryEnum;
    articlesMap: { string: Article[] };
    updateSelectedArticles: (articleId: string | undefined, slot: number) => void;
    slot: number;
    setError: Dispatch<SetStateAction<boolean>>;
}

const CapsuleElement = ({ defaultArticleType, articlesMap, updateSelectedArticles, slot, setError }: CapsuleElementProps) => {
    const [index, setIndex] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum>(defaultArticleType);
    const [refreshedArticlesOfSelectedCategory, setRefreshedArticlesOfSelectedCategory] = useState<Article[]>();
    const [currentArticle, setCurrentArticle] = useState<Article>();

    const noArticlesInCategory = articlesMap[selectedCategory].length === 0;

    useEffect(() => {
        const articles = articlesMap[selectedCategory];

        if (articles.length > 0) {
            batchUpdateGoogleUrls(articles)
                .then((articles) => {
                    setRefreshedArticlesOfSelectedCategory(articles);
                    setError(false)
                    setIndex(0);
                })
                .catch((error) => {
                    console.log(error)
                    setError(true)
                })
        } else {
            setRefreshedArticlesOfSelectedCategory([])
        }
    }, [articlesMap, selectedCategory]);

    useEffect(() => {
        if (refreshedArticlesOfSelectedCategory) {
            setCurrentArticle(refreshedArticlesOfSelectedCategory[index])
            updateSelectedArticles(refreshedArticlesOfSelectedCategory[index]?.id, slot)
        }
    }, [articlesMap, refreshedArticlesOfSelectedCategory, index]);

    const handleLeftArrowClick = () => {
        if (index === 0) {
            setIndex(refreshedArticlesOfSelectedCategory?.length - 1)
        } else {
            setIndex(index - 1)
        }
    }

    const handleRightArrowClick = () => {
        if (index === refreshedArticlesOfSelectedCategory?.length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    return (
        <div className="flex flex-col h-full m-1 md:mt-8">
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

            <div className="flex space-x-1 justify-center items-center">
                {noArticlesInCategory &&
                    <p className="text-sm w-3/4 mt-8 text-center self-center text-neutral-400 md:text-2xl">
                        There are no articles in this category
                    </p>}

                {currentArticle &&
                    <>
                        <div className="w-[10%]">
                            <Image
                                src={"/arrow-down-gray.svg"}
                                alt={"left arrow"}
                                width="15"
                                height="15"
                                onClick={() => handleLeftArrowClick()}
                                className="rotate-90 h-max rounded-full bg-theme-background-green drop-shadow w-full"
                            />
                        </div>

                        <Polaroid imageUrl={currentArticle?.image.baseUrl || ""} size="small"/>

                        <div className="w-[10%]">
                            <Image
                                src={"/arrow-down-gray.svg"}
                                alt={"right arrow"}
                                width="15"
                                height="15"
                                onClick={() => handleRightArrowClick()}
                                className="-rotate-90 h-max rounded-full bg-theme-background-green drop-shadow w-full"
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default CapsuleElement