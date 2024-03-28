import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { User } from "@/types/user";
import { GooglePhotoMetadata } from "@/types/GooglePhotoMetadata";
import axios from "axios";
import Image from "next/image";
import GalleryImage from "@/app/components/GalleryImage";

interface ImageSelection {
    setImage: Dispatch<SetStateAction<string | undefined>>;
    setIsSelecting: Dispatch<SetStateAction<boolean>>;
}

export const ImageSelection = ({ setImage, setIsSelecting }) => {
    const user: User = useUser();
    const [googlePhotos, setGooglePhotos] = useState<GooglePhotoMetadata[]>()

    useEffect(() => {
        axios.get("https://photoslibrary.googleapis.com/v1/mediaItems", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.googleAccessToken
            },
            params: {
                pageSize: "50"
            }
        })
            .then((response) => {
                const data = response.data.mediaItems.map((item: any) => {
                    return {
                        baseUrl: item.baseUrl,
                        imageId: item.id
                    }
                })
                setGooglePhotos(data)
            })
    }, []);

    const handleClick = async (image: GooglePhotoMetadata) => {
        setImage(image)
        setIsSelecting(false)
    }

    return (
        <div>
            <div className="flex">
                <Image src="/left-arrow.svg" width="50" height="50" alt="back arrow"/>
                <p className="mb-4 text-lg">Select photo</p>
            </div>

            {!googlePhotos && <div>Loading...</div>}

            {googlePhotos && (
                <div className="grid grid-cols-4 gap-2">
                    {googlePhotos!.map((photoData) =>
                        <GalleryImage
                            photoData={photoData}
                            handleSelection={handleClick}
                            key={photoData.imageId}
                        />)}
                </div>
            )}
        </div>
    )
}