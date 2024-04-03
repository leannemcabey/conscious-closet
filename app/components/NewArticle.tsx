import axios from "axios";
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react";
import {User} from "@/types/user";
import {GooglePhotoMetadata} from "@/types/GooglePhotoMetadata";
import {WeatherCategory} from "@/types/enums/WeatherCategory";
import {googlePhotosPathLoader} from "@/utils/googlePhotosPathLoader";
import {AddFromGooglePhotosButton} from "@/app/components/newArticle/AddFromGooglePhotosButton";


interface NewArticleProps {
    category: string;
    imageId: string;
    setIsSelecting: Dispatch<SetStateAction<boolean>>
}

export const NewArticle = ({ category, imageId, setIsSelecting }) => {
    const [image, setImage] = useState<GooglePhotoMetadata | undefined>(undefined)
    const [weatherCategory, setWeatherCategory] = useState<WeatherCategory | undefined>(undefined)

    useEffect(() => {
        if (imageId) {
            axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems/${imageId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.googleAccessToken
                }
            })
                .then((response) => {
                    const data = {
                        baseUrl: response.data.baseUrl,
                        imageId: response.data.id
                    }
                    setImage(data)
                });
            // TODO: is there an endpoint in the google photos api for getting many photos at once?
        }
    }, []);

    const addNewArticle = async () => {
        const articleType = toArticleType(category)

        await axios.post("http://localhost:4000/articles/",{
            userId: authenticatedUser?.id, // TODO handle unauthenticated?
            googlePhotosID: imageId,
            weatherCategory: weatherCategory,
            articleType: articleType
        })
            .then((data) => console.log(data))
            .then(() => router.push(`/articles/category/${category}`))
    }

    return (
        <Layout>
            <h1 className="mt-4 text-2xl font-semibold">{category.toUpperCase()}</h1>

            <div className="flex justify-center items-center mt-4 w-full h-72 border-2 border-dashed border-slate-300 rounded-md">
                {image ?
                    <Image
                        loader={googlePhotosPathLoader}
                        width={250}
                        height={280}
                        src={image.baseUrl}
                    />
                    : <AddFromGooglePhotosButton setIsSelecting={setIsSelecting}/>}
            </div>

            <div className="flex flex-col">
                <div className="w-16 overflow-hidden inline-block self-end">
                    <div className="h-24 bg-neutral-100 rotate-45 transform origin-bottom-left" />
                </div>
                <div className="h-32 flex flex-col justify-center items-center bg-neutral-100 rounded-lg">
                    <p>Select a weather category:</p>
                    <div className="w-3/4 flex justify-evenly mt-4">
                        <div className={`flex justify-center p-0.5 rounded-lg ${weatherCategory === WeatherCategory.WARM && "border border-theme-green"}`}>
                            <Image src="/warm-weather-icon.svg" height="40px" width="40px" alt="warm weather icon" onClick={() => setWeatherCategory(WeatherCategory.WARM)} />
                        </div>
                        <div className={`flex justify-center p-0.5 rounded-lg ${weatherCategory === WeatherCategory.MIXED && "border border-theme-green"}`}>
                            <Image src="/mixed-weather-icon.svg" height="40px" width="40px" alt="mixed weather icon" onClick={() => setWeatherCategory(WeatherCategory.MIXED)} />
                        </div>
                        <div className={`flex justify-center p-0.5 rounded-lg ${weatherCategory === WeatherCategory.COLD && "border border-theme-green"}`}>
                            <Image src="/cold-weather-icon.svg" height="40px" width="40px" alt="cold weather icon" onClick={() => setWeatherCategory(WeatherCategory.COLD)} />
                        </div>
                    </div>
                </div>
                {/* TODO disable this until an image and weather category are selected */}
                <button onClick={createNewArticle} className="mt-8 self-end">
                    <Image src="/check-mark-button.svg" height="40px" width="40px" alt="check mark icon" />
                </button>
            </div>
        </Layout>
    )
};