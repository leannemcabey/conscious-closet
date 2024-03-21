import * as React from "react";
import {FC, ReactNode} from "react";

interface ArticleTypesProps {
    children: ReactNode
}

export default function ArticleTypes({ children }) {
    return (
        <div className="mt-12 flex flex-col items-center justify-center space-y-5">
            {children}
        </div>
    )
};