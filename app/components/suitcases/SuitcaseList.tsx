'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/getSuitcases";
import { Suitcase } from "@/types/Suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import {toSuitcase} from "@/utils/conversions/toSuitcase";
import BackButton from "@/app/components/navigation/BackButton";

const SuitcaseList = () => {
    // TODO: refresh data somehow when new suitcase is created

    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false)

    const orderDescending = (suitcases: Suitcase[]) => {
        return suitcases.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)
    }

    useEffect(() => {
        getSuitcases()
            .then((data) => {
                const suitcases = data?.map((suitcase) => toSuitcase(suitcase)) || []
                setSuitcases(orderDescending(suitcases))
            })
    }, [])

    // const openModal = () => {
    //     console.log("trying to open modal")
    //     setCreatingSuitcase(true);
    // }

    return (
        <>
            <NewSuitcaseButton setIsCreatingSuitcase={setCreatingSuitcase}/>
            {suitcases?.map((suitcase) =>
                <div className="w-full text-lg truncate py-4 border border-dotted border-neutral-300 border-b-2 border-t-0 border-l-0 border-r-0">
                    {suitcase.name}
                </div>
            )}

            {creatingSuitcase && <NewSuitcaseModal setIsOpen={setCreatingSuitcase} />}
        </>
    )
}

export default SuitcaseList;