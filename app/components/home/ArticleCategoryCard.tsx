import Link from 'next/link'
import { ArticleCategoryEnum, ArticleCategoryTitle } from "@/types/enums/articleCategoryEnum";
import { categoryTitleToPathSlug } from "@/utils/categoryTitleToPathSlug";

interface ArticleCategoryCardProps {
    title: ArticleCategoryTitle
}

export default function ArticleCategoryCard({ title }) {
    const pathSlug: ArticleCategoryEnum = categoryTitleToPathSlug(title);

    return (
        <div className="flex flex-col justify-center w-11/12 h-20 rounded-lg bg-white drop-shadow">
            <Link href={`/articles/category/${pathSlug}`}>
                <div className="text-center tracking-widest text-2xl text-neutral-800">
                    {title}
                </div>
            </Link>
        </div>
    )
};