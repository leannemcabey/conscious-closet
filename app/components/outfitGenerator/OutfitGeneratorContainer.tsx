import Image from "next/image";
import * as React from "react";
import OutfitElement from "@/app/components/outfitGenerator/OutfitElement";
import {ArticleCategoryEnum} from "@/types/enums/articleCategoryEnum";

const OutfitGeneratorContainer = () => {
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

            <div className="h-4/5 grid grid-cols-2">
                <OutfitElement defaultArticleType={ArticleCategoryEnum.TOPS}/>
                <OutfitElement defaultArticleType={ArticleCategoryEnum.TOPS}/>
                <OutfitElement defaultArticleType={ArticleCategoryEnum.OUTERWEAR}/>
                <OutfitElement defaultArticleType={ArticleCategoryEnum.PANTS}/>
                <OutfitElement defaultArticleType={ArticleCategoryEnum.ACCESSORIES}/>
                <OutfitElement defaultArticleType={ArticleCategoryEnum.SHOES}/>
            </div>
        </div>
    )
}

export default OutfitGeneratorContainer;