'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface NewArticleImageProps {
    baseUrl: string;
}

export const NewArticleImage = ({ baseUrl }) => {
    return (
        <div className="flex justify-center items-center">
            <Image
                loader={googlePhotosPathLoader}
                width={125}
                height={140}
                src={baseUrl}
                alt={`clothing image`}
                className="rounded-md"
            />
        </div>
    )
}