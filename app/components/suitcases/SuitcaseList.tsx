'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { Suitcase } from "@/types/Suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import { toSuitcase } from "@/utils/conversions/toSuitcase";
import { orderByNewestCreated } from "@/utils/orderByNewestCreated";
import Link from "next/link";

const SuitcaseList = () => {
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false)

    useEffect(() => {
        getSuitcases()
            .then((data) => {
                const suitcases = data?.map((suitcase) => toSuitcase(suitcase)) || []
                setSuitcases(orderByNewestCreated(suitcases))
            })
    }, [])

    return (
        <>
            <NewSuitcaseButton handleClick={() => setCreatingSuitcase(true)} />
            <div className="h-4/6 overflow-scroll">
                {suitcases?.map((suitcase) =>
                    <Link href={`/suitcases/${suitcase.id}`} key={suitcase.id}>
                        <div className="w-full text-lg truncate py-4 border border-dotted border-neutral-300 border-b-2 border-t-0 border-l-0 border-r-0">
                            {suitcase.name}
                        </div>
                    </Link>
                )}
            </div>

            {creatingSuitcase && <NewSuitcaseModal closeModal={() => setCreatingSuitcase(false)} setSuitcases={setSuitcases}/>}
        </>
    )
}

export default SuitcaseList;