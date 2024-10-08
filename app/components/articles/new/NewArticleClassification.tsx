import { GooglePhotoMetadata } from "@/types/googlePhotoMetadata";
import Polaroid from "@/app/components/articles/Polaroid";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ArticleCategoryEnum, ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";
import { WeatherPicker } from "@/app/components/articles/new/WeatherPicker";
import { WeatherCategoryEnum } from "@/types/enums/weatherCategoryEnum";
import Warning from "@/app/components/articles/new/Warning";
import ArticleClassification from "@/app/components/articles/ArticleClassification";
import SaveButton from "@/app/components/buttons/SaveButton";

interface NewArticleClassificationProps {
    setStep: Dispatch<SetStateAction<number>>;
    image: GooglePhotoMetadata;
    selectedCategory: ArticleCategoryEnum | undefined;
    setSelectedCategory: Dispatch<SetStateAction<ArticleCategoryEnum | undefined>>;
    selectedWeatherCategory: WeatherCategoryEnum | undefined;
    setSelectedWeatherCategory: Dispatch<SetStateAction<WeatherCategoryEnum | undefined>>;
    handleSubmit: () => void;
}

const NewArticleClassification = ({ image, setStep, selectedCategory, setSelectedCategory, selectedWeatherCategory, setSelectedWeatherCategory, handleSubmit }: NewArticleClassificationProps) => {
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

            <ArticleClassification
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedWeatherCategory={selectedWeatherCategory}
                setSelectedWeatherCategory={setSelectedWeatherCategory}
            />

            {selectedCategory && selectedWeatherCategory && <Warning />}

            <SaveButton disabled={!selectedCategory || !selectedWeatherCategory} handleClick={handleSubmit} />
        </div>
    )
}

export default NewArticleClassification;