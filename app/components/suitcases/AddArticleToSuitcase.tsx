'use client'
import Image from "next/image";
import { Article } from "@/types/Article";
import { useEffect, useState } from "react";
import { Suitcase } from "@/types/Suitcase";
import { getSuitcases } from "@/app/server-actions/getSuitcases";
import Modal from "@/app/components/modal";
import AddToSuitcaseMenu from "@/app/components/suitcases/AddToSuitcaseMenu";

interface AddArticleToSuitcaseProps {
    article: Article;
}

const AddArticleToSuitcase = ({ article }: AddArticleToSuitcaseProps) => {
    const [isSelectingSuitcase, setIsSelectingSuitcase] = useState<boolean>(false)
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [suitcaseIds, setSuitcaseIds] = useState<string[]>([]);

    useEffect(() => {
        getSuitcases()
            .then((data) => setSuitcases(data))
    }, [])

    const suitcaseMenu = (suitcases: Suitcase[]) => {
        return (
            <Modal setIsOpen={setIsSelectingSuitcase}>
                <AddToSuitcaseMenu suitcases={suitcases} />
            </Modal>
        )
    }

    return (
        <>
            <div className="h-12 w-12 bg-theme-light-green rounded-full p-2 drop-shadow-md">
                <Image
                    src={"/luggage-icon.png"}
                    alt={"luggage icon"}
                    width="30" height="30"
                    onClick={() => setIsSelectingSuitcase(!isSelectingSuitcase)}
                />
            </div>
            {isSelectingSuitcase && suitcaseMenu(suitcases || [])}
        </>
    )
}

export default AddArticleToSuitcase;