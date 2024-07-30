'use client'
import * as React from "react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import { batchUpdateGoogleUrls } from "@/app/googleService/client/batchUpdateGoogleUrls";
import Polaroid from "@/app/components/articles/Polaroid";
import DropdownMenu from "@/app/components/capsuleCreator/DropdownMenu";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";

interface CapsuleElementProps {
    defaultArticleType: ArticleCategoryEnum;
    articlesMap: { string: Article[] };
    updateSelectedArticles: (articleId: string, slot: number) => void;
    slot: number;
}

const CapsuleElement = ({ defaultArticleType, articlesMap, updateSelectedArticles, slot }: CapsuleElementProps) => {
    const [index, setIndex] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum>(defaultArticleType);
    const [refreshedArticlesOfSelectedCategory, setRefreshedArticlesOfSelectedCategory] = useState<Article[]>();
    const [currentArticle, setCurrentArticle] = useState<Article>();
    const [error, setError] = useState<boolean>(false);

    const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

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
        <div className="flex flex-col m-1 flex-col-reverse justify-end">
            {!currentArticle && (
                <div className="flex justify-center">
                    <UndevelopedPolaroid />
                </div>
            )}

            {currentArticle && (
                <div className="flex h-full space-x-1 justify-center items-center">
                    <Image
                        src={"/arrow-down-gray.svg"}
                        alt={"left arrow"}
                        width="15"
                        height="15"
                        onClick={() => handleLeftArrowClick()}
                        className="rotate-90 h-max rounded-full bg-theme-background-green drop-shadow"
                    />

                    <div>
                        <Polaroid imageUrl={currentArticle?.image.baseUrl || ""} size="small" />
                    </div>

                    <Image
                        src={"/arrow-down-gray.svg"}
                        alt={"right arrow"}
                        width="15"
                        height="15"
                        onClick={() => handleRightArrowClick()}
                        className="-rotate-90 h-max rounded-full bg-theme-background-green drop-shadow"
                    />
                </div>
            )}

            {/*
            This is placed last in the div so that the dropdown goes on top of the article image when opened.
            flex-col-reverse is used on the div to make this render at the top.
            */}
            <DropdownMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        </div>
    )
}

export default CapsuleElement