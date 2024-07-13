import Link from 'next/link'
import { ArticleCategoryEnum, ArticleCategoryTitle, categoryTitleToPathSlug } from "@/types/enums/articleCategoryEnum";

interface ArticleCategoryCardProps {
    title: ArticleCategoryTitle
}

export default function ArticleCategoryCard({ title }) {
    const pathSlug: ArticleCategoryEnum = categoryTitleToPathSlug(title);

    return (
        <Link href={`/articles/category/${pathSlug}`}>
            <div className="flex items-center justify-center w-80 h-20 text-2xl text-neutral-700 rounded-lg bg-white drop-shadow">
                {title}
            </div>
        </Link>
    )
};