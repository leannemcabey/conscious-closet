import * as React from "react";
import { FC } from "react";
import Link from 'next/link'

interface ArticleTypeCardProps {
    type: String
}

export default function ArticleTypeCard({ type }) {
    const pathSlug = type.toLowerCase().replace(" & ", "_")

    return (
        <Link href={`/articles/category/${pathSlug}`}>
            <div className="flex items-center justify-center w-80 h-20 text-2xl rounded-lg bg-white text-theme-green drop-shadow-lg">
                {type}
            </div>
        </Link>
    )
};