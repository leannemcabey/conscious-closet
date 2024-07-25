'use client'
import * as React from "react";
import Image from "next/image";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import {Article} from "@/types/article";
import {useEffect, useState} from "react";
import {batchUpdateGoogleUrls} from "@/app/googleService/client/batchUpdateGoogleUrls";
import Polaroid from "@/app/components/articles/Polaroid";
import DropdownMenu from "@/app/components/outfitBuilder/DropdownMenu";
import UndevelopedPolaroid from "@/app/components/articles/UndevelopedPolaroid";

interface OutfitElementProps {
    defaultArticleType: ArticleCategoryEnum,
    articlesMap: { string: Article[] }
}

const OutfitElement = ({ defaultArticleType, articlesMap }: OutfitElementProps) => {
    const { TOPS, PANTS, SHORTS, SKIRTS, DRESSES, JUMPSUITS_ROMPERS, ACTIVEWEAR, SHOES, OUTERWEAR, ACCESSORIES }
        = articlesMap

    const [index, setIndex] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<ArticleCategoryEnum>(defaultArticleType);
    const [refreshedArticlesOfSelectedCategory, setRefreshedArticlesOfSelectedCategory] = useState<Article[]>();
    const [currentArticle, setCurrentArticle] = useState<Article>();

    useEffect(() => {
        const articles = articlesMap[selectedCategory]

        if (articles.length > 0) {
            batchUpdateGoogleUrls(articles)
                .then((articles) => {
                    setRefreshedArticlesOfSelectedCategory(articles)
                })
        }
    }, [articlesMap, selectedCategory]);

    useEffect(() => {
        if (refreshedArticlesOfSelectedCategory) {
            setCurrentArticle(refreshedArticlesOfSelectedCategory[index])
        }
    }, [refreshedArticlesOfSelectedCategory, index]);

    // TODO fade in the images???
    // TODO selecting something without articles (accessories) doesn't reset the image to undevelopedpolaroid

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
        <div className="flex flex-col m-1 flex-col-reverse">
            {!currentArticle && (
                <div className="flex justify-center">
                    <UndevelopedPolaroid />
                </div>
            )}

            {currentArticle && (
                <div className="flex space-x-1 justify-center">
                    <Image
                        src={"/arrow-left.svg"}
                        alt={"left arrow"}
                        width="20"
                        height="20"
                        onClick={() => handleLeftArrowClick()}
                    />

                    <Polaroid imageUrl={currentArticle?.image.baseUrl || ""} size="small" />

                    <Image
                        src={"/arrow-right.svg"}
                        alt={"right arrow"}
                        width="20"
                        height="20"
                        onClick={() => handleRightArrowClick()}
                    />
                </div>
            )}

            <DropdownMenu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        </div>
    )
}

export default OutfitElement