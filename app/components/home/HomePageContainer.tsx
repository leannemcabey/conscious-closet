'use client'
import NewArticleModal from "@/app/components/articles/new/NewArticleModal";
import NewButton from "@/app/components/buttons/NewButton";
import WeatherCategories from "@/app/components/home/WeatherCategories";
import { ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";
import ArticleCategoryCard from "@/app/components/home/ArticleCategoryCard";
import * as React from "react";
import { useState } from "react";

interface HomePageContainerProps {
    allArticleExternalIds: Set<string>;
}

const HomePageContainer = ({ allArticleExternalIds }: HomePageContainerProps) => {
    const [addingArticle, setAddingArticle] = useState<boolean>(false);

    return (
        <>
            <div className="flex justify-center place-content-around">
                <WeatherCategories />
            </div>

            <div className="h-[87%] grid grid-cols-1 overflow-scroll mt-2 pb-2 md:h-[87%]">
                <div className="flex flex-col w-full items-center justify-center space-y-2">
                    {Object.values(ArticleCategoryTitle)
                        .map((title) => <ArticleCategoryCard title={title} key={title}/>)}
                </div>
            </div>

            {addingArticle &&
                <NewArticleModal
                    setIsOpen={setAddingArticle}
                    allArticleExternalIds={allArticleExternalIds}
                />
            }

            <div className="fixed top-12 right-[9px]">
                <NewButton
                    handleClick={() => setAddingArticle(true)}
                />
            </div>
        </>
    )
}

export default HomePageContainer;