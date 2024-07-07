'use client'
import Image from "next/image";
import { useState } from "react";
import { addOrRemoveFromCleanoutBag } from "@/app/server-actions/cleanout-bag/addOrRemoveFromCleanoutBag";
import { Article } from "@/types/Article";

interface AddOrRemoveFromCleanoutBagProps {
    article: Article;
}

const AddOrRemoveFromCleanoutBag = ({ article }: AddOrRemoveFromCleanoutBagProps) => {
    const [inCleanoutBag, setInCleanoutBag] = useState<boolean>(article.inCleanoutBag);

    const changeCleanoutBagStatus = () => {
        addOrRemoveFromCleanoutBag(article)
            .then(() => setInCleanoutBag(!inCleanoutBag))
    }

    const position = inCleanoutBag ? "justify-end" : "";
    const toggleStyling = inCleanoutBag ? "bg-theme-blue" : "bg-white";

    return (
        <div className={`flex ${position} ${toggleStyling} rounded-full w-20 h-max drop-shadow`}>
            <div className={`h-12 w-12 bg-white border border-theme-blue rounded-full p-2 drop-shadow`}>
                <Image
                    src={"/broom-icon.png"}
                    alt={"broom icon"}
                    width="30" height="30"
                    onClick={() => changeCleanoutBagStatus()}
                />
            </div>
        </div>
    )
};

export default AddOrRemoveFromCleanoutBag;