import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import Polaroid from "@/app/components/articles/Polaroid";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ArticleCategoryEnum, ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import Warning from "@/app/components/articles/new/Warning";

interface ArticleClassificationProps {
    setStep: Dispatch<SetStateAction<number>>;
    image: GooglePhotoMetadata;
    selectedCategory: ArticleCategoryEnum | undefined;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum | undefined>>;
    selectedWeatherCategory: WeatherCategoryEnum | undefined;
    setSelectedWeatherCategory: Dispatch<SetStateAction<WeatherCategoryEnum | undefined>>;
    handleSubmit: () => void;
}

const ArticleClassification = ({ image, setStep, selectedCategory, setSelectedCategory, selectedWeatherCategory, setSelectedWeatherCategory, handleSubmit }: ArticleClassificationProps) => {
    return (
        <div className="flex flex-col space-y-2">
            <Image
                src={"/left-arrow.svg"}
                alt={"Back arrow"}
                width={25}
                height={25}
                onClick={() => setStep(1)}
            />

            <div className="flex justify-center pb-4">
                <Polaroid imageUrl={image.baseUrl}/>
            </div>

            <WeatherPicker weatherCategory={selectedWeatherCategory} setWeatherCategory={setSelectedWeatherCategory}/>

            <div className="grid grid-cols-2 gap-1 max-w-[400px] self-center">
                {Object.keys(ArticleCategoryTitle).map((category) =>
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum])}
                        className={`rounded-full text-center truncate py-1 px-2 ${ArticleCategoryEnum[category as keyof typeof ArticleCategoryEnum] === selectedCategory ? "bg-theme-green text-white" : " border border-theme-green text-theme-green"}`}
                    >
                        {ArticleCategoryTitle[category as keyof typeof ArticleCategoryEnum]}
                    </button>
                )}
            </div>

            {selectedCategory && selectedWeatherCategory && <Warning />}

            <button
                className="pt-8 self-end"
                disabled={!selectedCategory || !selectedWeatherCategory}
                onClick={() => handleSubmit()}
            >
                <Image
                    src={selectedCategory && selectedWeatherCategory ? "/check-mark-button-green.svg" : "/check-mark-button-gray.svg"}
                    height={40}
                    width={40}
                    alt="save new article"
                />
            </button>
        </div>
    )
}

export default ArticleClassification;