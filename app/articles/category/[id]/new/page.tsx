'use client'
import Layout from "@/app/components/Layout";
import {useState} from "react";
import {googlePhotosPathLoader} from "@/utils/googlePhotosPathLoader";
import {AddFromGooglePhotosButton} from "@/app/components/AddFromGooglePhotosButton";
import {GooglePhotoMetadata} from "@/types/GooglePhotoMetadata";
import {WeatherCategory} from "@/types/enums/WeatherCategory";
import {WeatherPicker} from "@/app/components/WeatherPicker";
import Image from "next/image";
import {ImageSelection} from "@/app/components/ImageSelection";

export default function AddNewArticle({ params }: { params: { id: string } }) {
    const [isSelectingImage, setIsSelectingImage] = useState<boolean>(false)
    // const [newImageId, setNewImageId] = useState<string | undefined>(undefined)
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined)
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategory | undefined>(undefined)

    if (isSelectingImage) return (
        <ImageSelection setImage={setImage} setIsSelecting={setIsSelectingImage} />
    )

    return (
        <Layout>
            <h1 className="mt-4 text-2xl font-semibold">{params.id.toUpperCase()}</h1>

            <div
                className="flex justify-center items-center mt-4 w-full h-72 border-2 border-dashed border-slate-300 rounded-md">
                {image ?
                    <Image
                        loader={googlePhotosPathLoader}
                        width={250}
                        height={280}
                        src={image.baseUrl}
                        alt={`image of ${params.id}`}
                    />
                    : <AddFromGooglePhotosButton setIsSelecting={setIsSelectingImage}/>}
            </div>

            <div className="flex flex-col">
                <div className="w-16 overflow-hidden inline-block self-end">
                    <div className="h-24 bg-neutral-100 rotate-45 transform origin-bottom-left"/>
                </div>
                <div className="h-32 flex flex-col justify-center items-center bg-neutral-100 rounded-lg">
                    <p>Select a weather category:</p>
                    <div className="w-3/4 flex justify-evenly mt-4">
                        <WeatherPicker
                            weatherCategory={WeatherCategory.WARM}
                            isSelected={weatherCategory === WeatherCategory.WARM}
                            iconPath="/warm-weather-icon.svg"
                            select={setWeatherCategory}
                        />
                        <WeatherPicker
                            weatherCategory={WeatherCategory.MIXED}
                            isSelected={weatherCategory === WeatherCategory.MIXED}
                            iconPath="/mixed-weather-icon.svg"
                            select={setWeatherCategory}
                        />
                        <WeatherPicker
                            weatherCategory={WeatherCategory.COLD}
                            isSelected={weatherCategory === WeatherCategory.COLD}
                            iconPath="/cold-weather-icon.svg"
                            select={setWeatherCategory}
                        />
                    </div>
                </div>
                {/* TODO disable this until an image and weather category are selected */}
                <button onClick={() => console.log("creating a new article")} className="mt-8 self-end">
                    <Image src="/check-mark-button.svg" height="40" width="40" alt="check mark icon"/>
                </button>
            </div>

            {/*{isSelecting ?*/}
            {/*    <ImageSelection setNewImageId={setNewImageId} setIsSelecting={setIsSelecting}/>*/}
            {/*    : <NewArticle category={params.id} imageId={newImageId} setIsSelecting={setIsSelecting} />}*/}
        </Layout>
    )
};