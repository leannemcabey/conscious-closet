'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import { deleteAllFromCleanoutBag } from "@/app/server-actions/cleanout-bag/deleteAllFromCleanoutBag";
import DeleteAllFromCleanoutConfirmationModal
    from "@/app/components/cleanoutBag/DeleteAllFromCleanoutConfirmationModal";
import ArticleFilters, {FilterType} from "@/app/components/filter/ArticleFilters";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import Link from "next/link";
import ErrorModal from "@/app/components/modal/ErrorModal";
import TextButton from "@/app/components/buttons/TextButton";

interface CleanoutBagContainerProps {
    articles: Article[]
}

const CleanoutBagContainer = ({ articles }: CleanoutBagContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: true,
        selectedWeatherCategories: [WeatherCategoryEnum.COLD, WeatherCategoryEnum.MIXED, WeatherCategoryEnum.WARM],
        selectedArticleCategories: Object.keys(ArticleCategoryEnum).map((category) => ArticleCategoryEnum[category])
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [cleanoutBagArticles, setCleanoutBagArticles] = useState<Article[]>(articles);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(cleanoutBagArticles);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred when deleting these articles. Please try again."

    const filterTypes = [FilterType.weather, FilterType.category];

    useEffect(() => {
        const tempFilteredArticles = applyArticleFilters(articles, filterTypes, filterSettings);
        setFilteredArticles(tempFilteredArticles)
    }, [filterSettings]);

    const deleteAllAndResetData = () => {
        deleteAllFromCleanoutBag()
            .then(() => {
                setCleanoutBagArticles([])
                setIsDeleting(false)
            })
            .catch(() => setError(true))
    }

    const deleteDisabled: boolean = cleanoutBagArticles.length <= 0;

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col h-[97%] md:mt-8">
                <div className="flex place-content-between mb-4">
                    <Link href="/cleanout/recommendations">
                        <TextButton disabled={false} handleClick={() => {}}>
                            recycling | donating | thrifting
                        </TextButton>
                    </Link>

                    <TextButton disabled={deleteDisabled} handleClick={() => setIsDeleting(true)}>
                        delete all
                    </TextButton>
                </div>

                <ArticleFilters filterTypes={filterTypes} />

                {isDeleting && <DeleteAllFromCleanoutConfirmationModal setIsDeleting={setIsDeleting} handleSubmit={deleteAllAndResetData}/>}
                {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}

                {filteredArticles.length > 0 && (
                    <div className="h-[80%] md:h-[78%] pb-4">
                        <ArticlesContainer articles={filteredArticles} />
                    </div>
                )}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles in your cleanout bag that match the applied filters.
                    </p>
                }
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CleanoutBagContainer;