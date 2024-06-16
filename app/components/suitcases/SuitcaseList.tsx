'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/getSuitcases";
import { Suitcase } from "@/types/Suitcase";

const SuitcaseList = () => {
    const [suitcases, setSuitcases] = useState<Suitcase[]>()

    useEffect(() => {
        getSuitcases()
            .then((data) => setSuitcases(data))
    }, [])

    return (
        <>
            {suitcases?.map((suitcase) => <p>{suitcase.name}</p>)}
        </>
    )
}

export default SuitcaseList;