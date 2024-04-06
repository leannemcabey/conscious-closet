'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface NewArticleImageProps {
    baseUrl: string;
}

export const NewArticleImage = ({ baseUrl }) => {
    return (
        <div className="flex justify-center items-center mt-4 w-full h-72 border-2 border-dashed border-slate-300 rounded-md">
            <Image
                loader={googlePhotosPathLoader}
                width={250}
                height={280}
                src={baseUrl}
                alt={`clothing image`}
            />
        </div>
    )
}