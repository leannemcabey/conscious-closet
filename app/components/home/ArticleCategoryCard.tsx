import Link from 'next/link'
import { ArticleCategory, ArticleCategoryTitle, categoryTitleToPathSlug } from "@/types/enums/ArticleCategory";

interface ArticleCategoryCardProps {
    title: ArticleCategoryTitle
}

export default function ArticleCategoryCard({ title }) {
    const pathSlug: ArticleCategory = categoryTitleToPathSlug(title);

    return (
        <Link href={`/articles/category/${pathSlug}`}>
            <div className="flex items-center justify-center w-80 h-20 text-2xl rounded-lg bg-white text-text-green drop-shadow-lg">
                {title}
            </div>
        </Link>
    )
};