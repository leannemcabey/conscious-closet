'use client'
import * as React from "react";
import Image from "next/image";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import {Article} from "@/types/article";
import {useEffect, useState} from "react";
import {batchUpdateGoogleUrls} from "@/app/googleService/client/batchUpdateGoogleUrls";
import Polaroid from "@/app/components/articles/Polaroid";

interface OutfitElementProps {
    defaultArticleType: ArticleCategoryEnum,
    articlesMap: { string: Article[] }
}

const OutfitElement = ({ defaultArticleType, articlesMap }: OutfitElementProps) => {
    const { TOPS, PANTS, SHORTS, SKIRTS, DRESSES, JUMPSUITS_ROMPERS, ACTIVEWEAR, SHOES, OUTERWEAR, ACCESSORIES }
        = articlesMap

    const [index, setIndex] = useState<number>(0);
    const [category, setCategory] = useState<ArticleCategoryEnum>(defaultArticleType);
    const [refreshedArticlesOfSelectedCategory, setRefreshedArticlesOfSelectedCategory] = useState<Article[]>();
    const [currentArticle, setCurrentArticle] = useState<Article>();

    useEffect(() => {
        const articles = articlesMap[category]

        if (articles.length > 0) {
            batchUpdateGoogleUrls(articles)
                .then((articles) => {
                    setRefreshedArticlesOfSelectedCategory(articles)
                })
        }
    }, [articlesMap, category]);

    useEffect(() => {
        if (refreshedArticlesOfSelectedCategory) {
            setCurrentArticle(refreshedArticlesOfSelectedCategory[index])
        }
    }, [refreshedArticlesOfSelectedCategory, index]);

    return (
        <div className="flex flex-col m-1">
            <select
                name="article_type"
                id="article_type"
                className="rounded-full self-center text-center border border-theme-green text-text-green focus:outline-none mb-2"
            >
                {/*<option value="none" className="bg-white">none</option>*/}
                {Object.keys(ArticleCategoryEnum).map((category) => {
                    const selected = ArticleCategoryEnum[category] === defaultArticleType
                    return <option key={category} value={ArticleCategoryEnum[category]}>{ArticleCategoryEnum[category]}</option>
                })}
            </select>

            {!currentArticle && (
                // <div className="flex justify-center h-[450px]">
                    <Image src={`/loading.svg`} height="75" width="75" alt="loading" className="animate-spin"/>
                // </div>
            )}

            {currentArticle && <Polaroid imageUrl={currentArticle?.image.baseUrl || ""} size="small" />}

            <div className="flex place-content-between">
                <Image
                    src={"/arrow-left.svg"}
                    alt={"left arrow"}
                    width="30"
                    height="30"
                    onClick={() => setIndex(index - 1)}
                />
                <Image
                    src={"/arrow-right.svg"}
                    alt={"right arrow"}
                    width="30"
                    height="30"
                    onClick={() => setIndex(index + 1)}
                />
            </div>
        </div>
    )
}

export default OutfitElement