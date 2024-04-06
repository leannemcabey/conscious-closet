'use client'
import Image from "next/image";
import { googlePhotosPathLoader } from "@/utils/googlePhotosPathLoader";
import Link from "next/link";
import { Article } from "@/types/Article";

interface ArticleImageProps {
    article: Article;
}

const ArticleImage = ({ article }: ArticleImageProps) => {
    return (
        <Link href={`/articles/${article.id}`} >
            <Image
                loader={googlePhotosPathLoader}
                src={article.image.baseUrl}
                width={200}
                height={250}
                alt="clothing article image"
            />
        </Link>
    )
}

export default ArticleImage;