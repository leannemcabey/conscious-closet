'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/getSuitcases";
import { Suitcase } from "@/types/Suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import { toSuitcase } from "@/utils/conversions/toSuitcase";
import {orderByNewestCreated} from "@/utils/orderByNewestCreated";

const SuitcaseList = () => {
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false)

    useEffect(() => {
        console.log("use effect is running")
        getSuitcases()
            .then((data) => {
                const suitcases = data?.map((suitcase) => toSuitcase(suitcase)) || []
                setSuitcases(orderByNewestCreated(suitcases))
            })
    }, [])

    return (
        <>
            <NewSuitcaseButton setIsCreatingSuitcase={setCreatingSuitcase}/>
            {suitcases?.map((suitcase) =>
                <div key={suitcase.id} className="w-full text-lg truncate py-4 border border-dotted border-neutral-300 border-b-2 border-t-0 border-l-0 border-r-0">
                    {suitcase.name}
                </div>
            )}

            {creatingSuitcase && <NewSuitcaseModal setIsOpen={setCreatingSuitcase} setSuitcases={setSuitcases}/>}
        </>
    )
}

export default SuitcaseList;