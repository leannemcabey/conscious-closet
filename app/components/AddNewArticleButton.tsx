import * as React from "react";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface AddNewArticleButtonProps {
    category: string;
}

export default function AddNewArticleButton({ category }) {
    return (
        <Link href={`/articles/category/${category}/new`}>
            <div className="flex flex-col space-y-2 justify-center text-center w-full h-60 border-2 border-dashed border-slate-300 rounded-md">
                <Image src="/plus-icon.svg" height="40" width="40" alt="plus icon"/>
            </div>
        </Link>
    )
};