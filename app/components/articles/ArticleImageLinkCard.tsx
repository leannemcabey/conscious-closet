'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";
import Link from "next/link";
import { Article } from "@/types/article";
import LastWorn from "@/app/components/articles/LastWorn";
import ArticleWeatherCategory from "@/app/components/articles/ArticleWeatherCategory";

interface ArticleImageProps {
    article: Article;
}

const ArticleImage = ({ article }: ArticleImageProps) => {
    return (
        <Link href={`/articles/${article.id}`}>
            <div className="flex justify-center bg-white w-28 drop-shadow-lg">
                <div className="mt-2 mb-8 bg-white">
                    <Image
                        loader={googlePhotosPathLoader}
                        src={article.image.baseUrl}
                        width={100}
                        height={150}
                        alt="clothing article image"
                        className="border border-neutral-200"
                    />
                </div>
                {/*<div className="w-full flex mb-4 space-x-12 justify-center">*/}
                {/*</div>*/}
            </div>
        </Link>
    )
}

export default ArticleImage;