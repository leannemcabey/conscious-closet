'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";

interface NewArticleImageProps {
    baseUrl: string;
}

export const NewArticleImage = ({ baseUrl }: NewArticleImageProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex justify-center bg-white w-48 drop-shadow-lg">
                <div className="mt-2 mb-10 bg-white">
                    <Image
                        loader={googlePhotosPathLoader}
                        width={175}
                        height={225}
                        src={baseUrl}
                        alt={`clothing image`}
                        className="border border-neutral-200"
                    />
                </div>
            </div>
        </div>
    )
}