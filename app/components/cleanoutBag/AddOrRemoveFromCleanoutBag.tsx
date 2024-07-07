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
    const styling = inCleanoutBag ? "bg-theme-light-green" : "bg-gray-300";

    return (
        <div className={`flex ${position} rounded-full bg-theme-gray w-20 h-max drop-shadow-md`}>
            <div className={`h-12 w-12 ${styling} rounded-full p-2 drop-shadow-sm`}>
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