import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { ArticleCategoryEnum, ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";
import { Dispatch, SetStateAction } from "react";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import { articleCategories } from "@/constants/articleCategories";

interface ArticleClassificationProps {
    selectedCategory: ArticleCategoryEnum | undefined;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum | undefined>>;
    selectedWeatherCategory: WeatherCategoryEnum | undefined;
    setSelectedWeatherCategory: Dispatch<SetStateAction<WeatherCategoryEnum | undefined>>;
}

const ArticleClassification = ({ selectedCategory, setSelectedCategory, selectedWeatherCategory, setSelectedWeatherCategory }: ArticleClassificationProps) => {
    return (
        <div className="flex flex-col justify-center space-y-2.5">
            <WeatherPicker weatherCategory={selectedWeatherCategory} setWeatherCategory={setSelectedWeatherCategory}/>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 max-w-[400px] md:max-w-[90%] self-center">
                {articleCategories.map((category) => {
                    const alreadySelected = ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum] === selectedCategory;

                    return (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])}
                            className={`rounded-full text-center text-sm truncate py-1 px-2 ${alreadySelected ? "bg-button-green text-white" : "border border-theme-green text-theme-green"}`}
                        >
                            {ArticleCategoryTitle[category as keyof typeof ArticleCategoryEnum]}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default ArticleClassification;