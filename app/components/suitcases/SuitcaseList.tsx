'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { Suitcase } from "@/types/suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import Link from "next/link";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import * as React from "react";

const SuitcaseList = () => {
    const [suitcases, setSuitcases] = useState<Suitcase[]>()
    const [creatingSuitcase, setCreatingSuitcase] = useState<boolean>(false)
    const [error, setError] = useState<boolean>();

    const errorMessage = "An error occurred when retrieving your suitcases. Please go back and try again."

    useEffect(() => {
        getSuitcases()
            .then((suitcases) => {
                setSuitcases(suitcases)
            })
            .catch(() => setError(true))
    }, [])

    if (error) return <ErrorPageContainer errorMessage={errorMessage} />

    return (
        <>
            <NewSuitcaseButton handleClick={() => setCreatingSuitcase(true)} />

            {suitcases && suitcases?.length > 0 && (
                <div className="h-4/6 overflow-scroll pb-8">
                    {suitcases.map((suitcase) =>
                        <Link href={`/suitcases/${suitcase.id}`} key={suitcase.id}>
                            <div className="w-full text-lg truncate py-4 border border-dotted border-neutral-300 border-b-2 border-t-0 border-l-0 border-r-0">
                                {suitcase.name}
                            </div>
                        </Link>
                    )}
                </div>
            )}

            {suitcases && suitcases.length === 0 && (
                <p className="w-3/4 mt-20 text-center self-center text-xl text-neutral-400">
                    You don't have any suitcases yet.
                </p>
            )}

            {creatingSuitcase &&
                <NewSuitcaseModal
                    isOpen={setCreatingSuitcase}
                    suitcases={suitcases || []}
                    setSuitcases={setSuitcases}
                />}
        </>
    )
}

export default SuitcaseList;