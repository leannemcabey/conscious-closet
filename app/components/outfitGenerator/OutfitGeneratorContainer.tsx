'use client'
import Image from "next/image";
import * as React from "react";
import OutfitElement from "@/app/components/outfitGenerator/OutfitElement";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { Article } from "@/types/article";
import { useEffect, useState } from "react";
import { batchUpdateGoogleUrls } from "@/app/googleService/client/batchUpdateGoogleUrls";

interface OutfitGeneratorContainerProps {
    articlesMap: { string: Article[] }
}

const OutfitGeneratorContainer = ({ articlesMap }: OutfitGeneratorContainerProps) => {
    // const [refreshedArticlesMap, setRefreshedArticlesMap] = useState<{ ArticleCategoryEnum: Article[] }>({});
    // const [error, setError] = useState<boolean>();
    //
    // const errorMessage = "An error occurred when retrieving your articles. Please go back and try again."

    // useEffect(() => {
    //     Object.keys(articlesMap).forEach((category) => {
    //         const articles = articlesMap[category];
    //         if (articles > 0) {
    //             batchUpdateGoogleUrls(articles)
    //                 .then((articles) => {
    //                     const refreshedObject = { [category]: articles }
    //                     setRefreshedArticlesMap({ ...refreshedArticlesMap, refreshedObject })
    //                 })
    //                 .catch(() => {
    //                     setError(true)
    //                 })
    //         }
    //     })
    //
    // }, [articlesMap]);

    return (
        <div className="h-full">
            <div className="flex justify-center mb-8">
                <h1 className="text-2xl mb-2.5 mr-2">outfit generator</h1>
                <div>
                    <Image
                        src={"/lightbulb.svg"}
                        alt={"light bulb icon"}
                        width="30"
                        height="30"
                    />
                </div>
            </div>

            {/*<p>{refreshedArticlesMap[ArticleCategoryEnum.TOPS].length}</p>*/}

            <div className="h-4/5 grid grid-cols-2">
                <OutfitElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={articlesMap} />
                <OutfitElement defaultArticleType={ArticleCategoryEnum.TOPS} articlesMap={articlesMap} />
                <OutfitElement defaultArticleType={ArticleCategoryEnum.OUTERWEAR} articlesMap={articlesMap} />
                <OutfitElement defaultArticleType={ArticleCategoryEnum.PANTS} articlesMap={articlesMap} />
                <OutfitElement defaultArticleType={ArticleCategoryEnum.ACCESSORIES} articlesMap={articlesMap} />
                <OutfitElement defaultArticleType={ArticleCategoryEnum.SHOES} articlesMap={articlesMap} />
            </div>
        </div>
    )
}

export default OutfitGeneratorContainer;