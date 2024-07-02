'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/getSuitcases";
import { Suitcase } from "@/types/Suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";

const SuitcaseList = () => {
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false)

    useEffect(() => {
        getSuitcases()
            .then((data) => setSuitcases(data))
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