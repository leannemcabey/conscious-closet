'use client'
import ArticlesContainer from "@/app/components/articles/ArticlesContainer";
import * as React from "react";
import { useEffect, useState } from "react";
import { Article } from "@/types/Article";
import { deleteAllFromCleanoutBag } from "@/app/server-actions/cleanout-bag/deleteAllFromCleanoutBag";
import DeleteAllFromCleanoutConfirmationModal
    from "@/app/components/cleanoutBag/DeleteAllFromCleanoutConfirmationModal";
import ArticleFilters, {FilterType} from "@/app/components/articles/filter/ArticleFilters";
import { ArticleFilterContext, FilterSettings } from "@/app/context/ArticleFilterContext";
import { WeatherCategory } from "@/types/enums/WeatherCategory";
import { ArticleCategory } from "@/types/enums/ArticleCategory";
import { applyArticleFilters } from "@/utils/applyArticleFilters";
import CleanoutOptionsModal from "@/app/components/cleanoutBag/CleanoutOptionsModal";

interface CleanoutBagContainerProps {
    articles: Article[]
}

const CleanoutBagContainer = ({ articles }: CleanoutBagContainerProps) => {
    const defaultFilterContext: FilterSettings = {
        showCleanoutBagItems: true,
        selectedWeatherCategories: [WeatherCategory.COLD, WeatherCategory.MIXED, WeatherCategory.WARM],
        selectedArticleCategories: [
            ArticleCategory.TOPS,
            ArticleCategory.BOTTOMS,
            ArticleCategory.JUMPSUITS_ROMPERS,
            ArticleCategory.ACTIVEWEAR,
            ArticleCategory.SHOES,
            ArticleCategory.OUTERWEAR,
            ArticleCategory.ACCESSORIES
        ]
    };

    const [filterSettings, setFilterSettings] = useState<FilterSettings>(defaultFilterContext);
    const [cleanoutBagArticles, setCleanoutBagArticles] = useState<Article[]>(articles);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>(cleanoutBagArticles);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [showCleanoutOptions, setShowCleanoutOptions] = useState(false);

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
    }

    const deleteDisabled: boolean = cleanoutBagArticles.length <= 0;

    return (
        <ArticleFilterContext.Provider value={{filterSettings, setFilterSettings}}>
            <div className="flex flex-col">
                <button
                    disabled={deleteDisabled}
                    onClick={() => setIsDeleting(true)}
                    className="rounded-lg bg-white text-neutral-700 drop-shadow self-center p-2 mb-8"
                >
                    delete all
                </button>

                <ArticleFilters filterTypes={filterTypes} />

                {isDeleting && <DeleteAllFromCleanoutConfirmationModal setIsDeleting={setIsDeleting} handleSubmit={deleteAllAndResetData}/>}

                {filteredArticles.length > 0 && <ArticlesContainer articles={filteredArticles} />}

                {filteredArticles.length === 0 &&
                    <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                        There are no articles in your cleanout bag that match the applied filters.
                    </p>
                }

                <button
                    onClick={() => setShowCleanoutOptions(true)}
                    className="w-11/12 bottom-8 fixed bg-theme-green text-white text-lg p-2 rounded-full drop-shadow"
                >
                    thrifting | recycling | donating
                </button>

                {showCleanoutOptions && <CleanoutOptionsModal setShowCleanoutOptions={setShowCleanoutOptions} />}
            </div>
        </ArticleFilterContext.Provider>
    )
}

export default CleanoutBagContainer;