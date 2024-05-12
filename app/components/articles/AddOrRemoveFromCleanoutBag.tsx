'use client'
import Image from "next/image";
import { Article } from "@/types/Article";
import { addOrRemoveFromCleanoutBag } from "@/app/server-actions/addOrRemoveFromCleanoutBag";
import { useState } from "react";

interface AddOrRemoveFromCleanoutBagProps {
    article: Article;
}

const AddOrRemoveFromCleanoutBag = ({ article }: AddOrRemoveFromCleanoutBagProps) => {
    const [inCleanoutBag, setInCleanoutBag] = useState<boolean>(article.inCleanoutBag);

    const changeCleanoutBagStatus = () => {
        addOrRemoveFromCleanoutBag(article)
            .then(() => setInCleanoutBag(!inCleanoutBag))
    }

    return (
        <>
            <p>In cleanout bag: {inCleanoutBag ? "yes" : "no"}</p>
            <Image
                src={"/broom-icon.png"}
                alt={"broom icon"}
                width="25" height="25"
                onClick={() => changeCleanoutBagStatus()}
                className="mx-4"
            />
        </>
    )
}

export default AddOrRemoveFromCleanoutBag;