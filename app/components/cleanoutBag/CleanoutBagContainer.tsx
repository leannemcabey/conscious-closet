'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { useEffect, useState } from "react";
import { Article } from "@/types/article";
import { deleteAllFromCleanoutBag } from "@/app/server-actions/cleanout-bag/deleteAllFromCleanoutBag";
import DeleteAllFromCleanoutConfirmationModal
    from "@/app/components/cleanoutBag/DeleteAllFromCleanoutConfirmationModal";
import ArticleFilters, {FilterType} from "@/app/components/articles/filter/ArticleFilters";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { ArticleCategoryEnum } from "@/types/enums/articleCategoryEnum";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import Link from "next/link";
import ErrorModal from "@/app/components/modal/ErrorModal";

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
            <div className="flex flex-col h-[97%]">
                <div className="flex place-content-between mb-4">
                    <Link href="/cleanout/recommendations">
                        <button className="w-max bg-white text-neutral-700 text-sm p-2 rounded-lg drop-shadow">
                            recycling | donating | thrifting
                        </button>
                    </Link>

                    <button
                        disabled={deleteDisabled}
                        onClick={() => setIsDeleting(true)}
                        className="rounded-lg bg-white text-neutral-700 text-sm drop-shadow p-2"
                    >
                        delete all
                    </button>
                </div>

                <ArticleFilters filterTypes={filterTypes} />

                {isDeleting && <DeleteAllFromCleanoutConfirmationModal setIsDeleting={setIsDeleting} handleSubmit={deleteAllAndResetData}/>}
                {error && <ErrorModal setIsOpen={setError} errorMessage={errorMessage} />}

                {filteredArticles.length > 0 && (
                    <div className="h-[80%] md:h-[90%] pb-4">
                        <ArticlesContainer headerSize="small" articles={filteredArticles} />
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