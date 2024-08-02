'use client'
import { useEffect, useState } from "react";
import { getSuitcases } from "@/app/server-actions/suitcase/getSuitcases";
import { Suitcase } from "@/types/suitcase";
import NewSuitcaseButton from "@/app/components/suitcases/NewSuitcaseButton";
import NewSuitcaseModal from "@/app/components/suitcases/NewSuitcaseModal";
import Link from "next/link";
import ErrorPageContainer from "@/app/components/ErrorPageContainer";
import * as React from "react";
import NewButton from "@/app/components/NewButton";

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
            <NewButton handleClick={() => setCreatingSuitcase(true)} />

            {suitcases && suitcases?.length > 0 && (
                <div className="h-[80%] overflow-scroll pb-4">
                    {suitcases.map((suitcase) =>
                        <Link href={`/suitcases/${suitcase.id}`} key={suitcase.id}>
                            <div className="w-full text-center text-lg text-text-green py-4 my-4 border border-theme-mid-green truncate bg-white rounded-lg drop-shadow md:text-2xl">
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