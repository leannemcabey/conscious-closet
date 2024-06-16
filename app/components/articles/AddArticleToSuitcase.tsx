'use client'
import Image from "next/image";
import { Article } from "@/types/Article";
import {useEffect, useState} from "react";
import { addArticleToSuitcase } from "@/app/server-actions/addArticleToSuitcase";
import {Suitcase} from "@/types/Suitcase";
import {getSuitcases} from "@/app/server-actions/getSuitcases";

interface AddArticleToSuitcaseProps {
    article: Article;
}

const AddArticleToSuitcase = ({ article }: AddArticleToSuitcaseProps) => {
    const [isSelectingSuitcase, setIsSelectingSuitcase] = useState<boolean>(false)
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [suitcaseId, setSuitcaseId] = useState<string>();

    useEffect(() => {
        getSuitcases()
            .then((data) => setSuitcases(data))
    }, [])

    // state for whether choosing suitcase or not
    // if choosing, render list of suitcases
    // click on it adds a check mark
    // CTA button to confirm
    // This calls addArticleToSuitcase()

    return (
        <>
            <Image
                src={"/luggage-icon.png"}
                alt={"luggage icon"}
                width="25" height="25"
                onClick={() => setIsSelectingSuitcase(true)}
                className="mx-4"
            />

            {isSelectingSuitcase &&
                suitcases?.map((suitcase) => <p>{suitcase.name}</p>)
            }
        </>
    )
}

export default AddArticleToSuitcase;