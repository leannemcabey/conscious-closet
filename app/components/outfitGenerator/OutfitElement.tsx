import * as React from "react";
import Image from "next/image";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";

interface OutfitElementProps {
    defaultArticleType: ArticleCategoryEnum
}

const OutfitElement = ({ defaultArticleType }: OutfitElementProps) => {
    return (
        <div className="flex flex-col m-1">
            <select
                name="article_type"
                id="article_type"
                className="rounded-full self-center text-center border border-theme-green text-text-green focus:outline-none mb-2"
            >
                <option value="none" className="bg-white">none</option>
                {Object.keys(ArticleCategoryEnum).map((category) => {
                    const selected = ArticleCategoryEnum[category] === defaultArticleType
                    return <option selected={selected} value={ArticleCategoryEnum[category]}>{ArticleCategoryEnum[category]}</option>
                })}
            </select>

            <div className="flex place-content-between">
                <Image
                    src={"/arrow-left.svg"}
                    alt={"left arrow"}
                    width="30"
                    height="30"
                />
                <Image
                    src={"/arrow-right.svg"}
                    alt={"right arrow"}
                    width="30"
                    height="30"
                />
            </div>
        </div>
    )
}

export default OutfitElement